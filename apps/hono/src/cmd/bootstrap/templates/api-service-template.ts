

interface ApiServiceTemplateProps {
  routename: string;
}
export function apiServiceTemplate({ routename }: ApiServiceTemplateProps) {
  const service = `
    import type { z } from "zod";
    
    import { and, ilike } from "drizzle-orm";
    
    import { ${routename}Table } from "@/db/schema/${routename}";
    import { entityType } from "@/services/audit-log.service";
    import { BaseCrudService } from "@/services/base-crud-service";
    
    import type {
      ${routename}InsertSchema,
      ${routename}UpdateSchema,
      listInventoryQueryParamsSchema,
    } from "../../schemas/invemtory.schema";
    
    export class InventoryService extends BaseCrudService<
      typeof ${routename}Table,
      z.infer<typeof ${routename}InsertSchema>,
      z.infer<typeof ${routename}UpdateSchema>
    > {
      constructor() {
        super(${routename}Table, entityType.INVENTORY);
      }
    
      // Override or add custom methods
      async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
        const { search, categoryId, ...paginationQuery } = query;
        const conditions = and(
      search ? ilike(${routename}Table.name, \`%\${search}%\`) : undefined,
        );
    
        return super.findAll(paginationQuery, conditions);
      }
    }
    
    `;
  return service;
}


