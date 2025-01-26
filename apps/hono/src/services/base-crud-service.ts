import type { SQL } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { Context } from "hono";

import { asc, desc, eq, sql } from "drizzle-orm";
import { getContext } from "hono/context-storage";

import type { AppBindings } from "@/lib/types";

import { db } from "@/db/client";

import type { EntityType } from "./audit-log.service";

import { auditAction, AuditLogService } from "./audit-log.service";

export interface PaginatedQuery {
  page: string;
  limit: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class BaseCrudService<T extends PgTable<any>, CreateDTO extends Record<string, any>, UpdateDTO extends Record<string, any>> {
  protected table: T;
  protected entityType: EntityType;
  private auditLogService: AuditLogService;

  constructor(table: T, entityType: EntityType) {
    this.table = table;
    this.entityType = entityType;
    this.auditLogService = new AuditLogService();
  }

  async findAll(query: PaginatedQuery, conditions?: SQL<unknown>) {
    const { page, limit, sort, order } = query;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(this.table)
      .where(conditions);

    // Build query
    const dbQuery = db
      .select()
      .from(this.table)
      .where(conditions)
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));

    // Add sorting
    if (sort) {
      dbQuery.orderBy(
        // TODO : extend type PgTable with a narrower type which always has an ID column
        // @ts-expect-error : the type is too genrric but shape matches
        order === "desc" ? desc(this.table[sort]) : asc(this.table[sort]),
      );
    }

    const items = await dbQuery;

    return {
      page: Number(page),
      perPage: Number(limit),
      totalItems: Number(count),
      totalPages: Math.ceil(Number(count) / Number(limit)),
      items,
    };
  }

  async findById(id: string) {
    const item = await db
      .select()
      .from(this.table)
    // TODO : extend type PgTable with a narrower type which always has an ID column
      // @ts-expect-error : the type is too genrric but shape matches
      .where(eq(this.table.id, id))
      .limit(1);

    return item[0];
  }

  async create(data: CreateDTO) {
    const ctx = getContext<AppBindings>();
    const userId = ctx.var.viewer?.id;
    const item = await db
      .insert(this.table)
      .values(data as any)
      .returning();

    await this.auditLogService.create(
      {
        userId,
        action: auditAction.CREATE,
        entityType: this.entityType,
        entityId: item[0].id,
        newData: data,

      },
    );

    return item[0];
  }

  async update(id: string, data: Partial<UpdateDTO>) {
    const oldItem = await this.findById(id);
    const ctx = getContext<AppBindings>();
    const userId = ctx?.var?.viewer?.id;
    console.log(" viewr  === ",ctx.var);
    console.log({userId});
    const item = await db
      .update(this.table)
      .set(data as any)
    // TODO : extend type PgTable with a narrower type which always has an ID column
      // @ts-expect-error : the type is too genrric but shape matches
      .where(eq(this.table?.id, id))
      .returning();

    await this.auditLogService.createChangeLog(
      {
        userId,
        entityType: this.entityType,
        entityId: id,
        oldData: oldItem,
        newData: data,
      },
    );
    // @ts-expect-error : the type is too genrric but shape matches
    return item[0];
  }

  async delete(id: string) {
    const oldItem = await this.findById(id);
    const ctx = getContext<AppBindings>();
    const userId = ctx.var.viewer.id;
    const item = await db
      .delete(this.table)
      // @ts-expect-error the type is too genrric but shape matches
      .where(eq(this.table.id, id))
      .returning();

    await this.auditLogService.create(
      {
        userId,
        action: auditAction.DELETE,
        entityType: this.entityType,
        entityId: id,
        oldData: oldItem,
      },
    );

    return item[0];
  }

  async softDelete(id: string) {
    return this.update(id, { isActive: false } as any);
  }

  async exists(id: string): Promise<boolean> {
    const item = await db
      // @ts-expect-error : the type is too genrric but shape matches
      .select({ id: this.table.id })
      .from(this.table)
    // TODO : extend type PgTable with a narrower type which always has an ID column
    // @ts-expect-error : the type is too genrric but shape matches
      .where(eq(this.table.id, id))
      .limit(1);

    return !!item[0];
  }
}
