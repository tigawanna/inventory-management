import type { PgTable, TableConfig } from "drizzle-orm/pg-core";
import type { z } from "zod";

import {  getTableColumns, ilike, or } from "drizzle-orm";
import { getContext } from "hono/context-storage";

import type { AppBindings } from "@/lib/types";

import { db } from "@/db/client";
import { usersTable } from "@/db/schema/users";
import { entityType } from "@/services/audit-log.service";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  listUsersQueryParamsSchema,
  usersInsertSchema,
  usersUpdateSchema,
} from "./users.schema";

export class UsersService extends BaseCrudService<
  typeof usersTable,
  z.infer<typeof usersInsertSchema>,
  z.infer<typeof usersUpdateSchema>
> {
  constructor() {
    super(usersTable, entityType.USER);
  }


  override async findAll(query: z.infer<typeof listUsersQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = or(
      search ? ilike(this.table.name, `%${search}%`) : undefined,
      search ? ilike(this.table.email, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }

  //  remove the create method from this class
  override async create() {
    return new Promise<never>((resolve, reject) => {
      reject(new Error("Not allowed"));
    });
  }

  override async update(id: string, input: Partial<z.infer<typeof usersUpdateSchema>>) {
    const ctx = getContext<AppBindings>();
    const viewrRole = ctx.var.viewer.role;
    if (viewrRole !== "admin") {
      const { role, lastLoginAt, password,email ,refreshToken, refreshTokenVersion, verificationToken, isEmailVerified, ...data } = input;
      return super.update(id, data);
    }
    const { lastLoginAt, password, refreshToken, email,refreshTokenVersion, verificationToken, isEmailVerified, ...data } = input;
    return super.update(id, data);
  }
}

type GenericTableConfig = TableConfig;
export function customColumns<T extends GenericTableConfig>(table: PgTable<T>) {
  const rest = getTableColumns(table);
  return rest;
}
