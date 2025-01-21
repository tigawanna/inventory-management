import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const auditLogsTable = pgTable("audit_logs", {
  ...commonColumns,
  userId: text("user_id").references(() => usersTable.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  oldData: jsonb("old_data"),
  newData: jsonb("new_data"),
  ipAddress: text("ip_address"),
});

