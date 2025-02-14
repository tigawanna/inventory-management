import { db } from "@/db/client.ts";
import { and, eq, SQL, desc, asc, sql } from "drizzle-orm";
import { type PgTable } from "drizzle-orm/pg-core";
import { type Request } from "express";
import {
  type EntityType,
  auditAction,
  AuditLogService,
} from "./audit-log.service.ts";

export interface PaginatedQuery {
  page: string;
  limit: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class BaseCrudService<T extends PgTable<any>, CreateDTO, UpdateDTO> {
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
        // @ts-expect-error
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
      // @ts-expect-error
      .where(eq(this.table.id, id))
      .limit(1);

    return item[0];
  }

  async create(data: CreateDTO, req: Request) {
    const item = await db
      .insert(this.table)
      .values(data as any)
      .returning();

    await this.auditLogService.create(
      {
        userId: req.user.id,
        action: auditAction.CREATE,
        entityType: this.entityType,
        entityId: item[0].id,
        // @ts-expect-error
        newData: data,
        ipAddress: req.ip,
      },
      req,
    );

    return item[0];
  }

  async update(id: string, data: Partial<UpdateDTO>, req: Request) {
    const oldItem = await this.findById(id);

    const item = await db
      .update(this.table)
      .set(data as any)
      // @ts-expect-error
      .where(eq(this.table?.id, id))
      .returning();

    await this.auditLogService.createChangeLog(
      {
        userId: req.user.id,
        entityType: this.entityType,
        entityId: id,
        oldData: oldItem,
        newData: data,
        ipAddress: req.ip,
      },
      req,
    );
    // @ts-expect-error
    return item[0];
  }

  async delete(id: string, req: Request) {
    const oldItem = await this.findById(id);

    const item = await db
      .delete(this.table)
      // @ts-expect-error
      .where(eq(this.table.id, id))
      .returning();

    await this.auditLogService.create(
      {
        userId: req.user.id,
        action: auditAction.DELETE,
        entityType: this.entityType,
        entityId: id,
        oldData: oldItem,
        ipAddress: req.ip,
      },
      req,
    );

    return item[0];
  }

  async softDelete(id: string, req: Request) {
    return this.update(id, { isActive: false } as any, req);
  }

  async exists(id: string): Promise<boolean> {
    const item = await db
      // @ts-expect-error
      .select({ id: this.table.id })
      .from(this.table)
      // @ts-expect-error
      .where(eq(this.table.id, id))
      .limit(1);

    return !!item[0];
  }
}
