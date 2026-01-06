CREATE TYPE "public"."activity_type" AS ENUM('LOW_STOCK', 'TRANSACTION_CREATED', 'USER_LOGIN', 'USER_LOGOUT', 'SETTINGS_UPDATED');--> statement-breakpoint
CREATE TYPE "public"."action" AS ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PASSWORD_RESET', 'EMAIL_VERIFY');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('USER', 'PRODUCT', 'CATEGORY', 'SUPPLIER', 'WAREHOUSE', 'TRANSACTION', 'STOCK', 'SETTINGS');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('PURCHASE', 'SALE', 'TRANSFER', 'ADJUSTMENT');--> statement-breakpoint
ALTER TYPE "public"."role" ADD VALUE 'suspended';--> statement-breakpoint
CREATE TABLE "activities" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"type" "activity_type" NOT NULL,
	"message" text NOT NULL,
	"user_id" text,
	"entity_type" text,
	"entity_id" text,
	"metadata" jsonb,
	"occurred_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hello" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatarUrl" text,
	"refreshToken" text,
	CONSTRAINT "hello_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"description" text,
	"sku" text,
	"category_id" text,
	"supplier_id" text,
	"price" numeric(10, 2) NOT NULL,
	"reorder_level" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL,
	"role_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stock_levels" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"product_id" text NOT NULL,
	"warehouse_id" text NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"reserved" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"address" text,
	"contact_person" text,
	"notes" text,
	CONSTRAINT "suppliers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "system_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"description" text,
	"updated_by_user_id" text,
	CONSTRAINT "system_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "inventory_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"type" "transaction_type" NOT NULL,
	"product_id" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2),
	"source_warehouse_id" text,
	"target_warehouse_id" text,
	"reference_id" text,
	"note" text,
	"performed_by_user_id" text,
	"performed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"location" text,
	"is_active" boolean DEFAULT true,
	"notes" text,
	CONSTRAINT "warehouses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ALTER COLUMN "action" SET DATA TYPE action;--> statement-breakpoint
ALTER TABLE "audit_logs" ALTER COLUMN "entity_type" SET DATA TYPE entity_type;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "metadata" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_login_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_levels" ADD CONSTRAINT "stock_levels_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_levels" ADD CONSTRAINT "stock_levels_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_settings" ADD CONSTRAINT "system_settings_updated_by_user_id_users_id_fk" FOREIGN KEY ("updated_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_source_warehouse_id_warehouses_id_fk" FOREIGN KEY ("source_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_target_warehouse_id_warehouses_id_fk" FOREIGN KEY ("target_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_performed_by_user_id_users_id_fk" FOREIGN KEY ("performed_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_roles_user_role_idx" ON "user_roles" USING btree ("user_id","role_id");--> statement-breakpoint
CREATE INDEX "stock_levels_product_warehouse_idx" ON "stock_levels" USING btree ("product_id","warehouse_id");