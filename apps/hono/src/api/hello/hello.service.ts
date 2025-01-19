
    import type { z } from "zod";
    
    import { and, ilike } from "drizzle-orm";
    
    import { helloTable } from "@/db/schema/hello";
    import { entityType } from "@/services/audit-log.service";
    import { BaseCrudService } from "@/services/base-crud-service";
    
    import type {
      helloInsertSchema,
      helloUpdateSchema,
      listHelloQueryParamsSchema,
    } from "./hello.schema";
    
    export class HelloService extends BaseCrudService<
      typeof helloTable,
      z.infer<typeof helloInsertSchema>,
      z.infer<typeof helloUpdateSchema>
    > {
      constructor() {
        super(helloTable, entityType.INVENTORY);
      }
    
      // Override or add custom methods
      async findAll(query: z.infer<typeof listHelloQueryParamsSchema>) {
        const { search, ...paginationQuery } = query;
        const conditions = and(
      search ? ilike(helloTable.name, `%${search}%`) : undefined,
        );
    
        return super.findAll(paginationQuery, conditions);
      }
    }
    
    