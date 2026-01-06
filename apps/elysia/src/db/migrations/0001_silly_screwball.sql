DROP INDEX "stock_levels_product_warehouse_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "stock_levels_product_warehouse_unique" ON "stock_levels" USING btree ("product_id","warehouse_id");--> statement-breakpoint
CREATE INDEX "stock_levels_product_idx" ON "stock_levels" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "stock_levels_warehouse_idx" ON "stock_levels" USING btree ("warehouse_id");