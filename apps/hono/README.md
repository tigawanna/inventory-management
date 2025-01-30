```sh
cd apps/backend (honojs)
npm run dev
```

```sh
open api documnetation is on
http://localhost:5000/doc

open api reference UI is on
http://localhost:5000/reference
```

Uses

- [honojs (repress like router)](https://hono.dev/)
- [hono-zod-openapi for code first apidocs](https://hono.dev/examples/zod-openapi)
- [drizzle + postgress](<[postgresql](https://orm.drizzle.team/docs/get-started-postgresql)>)
- redis for caching

### Hono js entry point setup

Honojs is just like express witha key diffecrence of having the `Request` and `Response` be inside the context

```ts
import { Hono } from "hono";
const app = new Hono();

app.get("/", (c) => {
// c.req :request
// c.res: response
// c.var: async local storage values
// c.env : enviroment specific methods (nodejs,f=deno,cf workers...)
  return c.text("Hono!");
  return c.json({ message: "Hono!" });
});

export default app;
```

The entry point for this app is `apps/hono/src/index.ts`
which import the actual app setup with routes and middleware , This is to make testing esaiser

```ts
export function createApp() {
  const app = createRouter();
  app.use("*", cors({
    origin: [...allowedOrigins],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })); // enable cors with support for cross site httpOnly cookies
  app.use(requestId());// adds the requset id (for logging)
  app.use(pinoLogger());// logging middleware
  app.use(contextStorage()); // initializes async local storage
  app.use("/api/users/*", (c, next) => authenticateUserMiddleware(c, next)); // auth gurad to only allow logged in users
  app.use("/api/auditlogs/*", (c, next) => authenticateUserMiddleware(c, next, "admin")); // auth gaurd to only allow admin users
  app.use(serveEmojiFavicon("📝")); // adds the emoji as favioc
  app.notFound(notFound); // global not found handler
  app.onError(onHonoError); // global error handler
  return app;
}
```

### DB

Drizzle is used to manage the database schemas and migrations

```ts
// example schema

import { boolean, decimal, integer, pgTable, text } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";

export const helloTable = pgTable("hello", {
  ...commonColumns,
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatarUrl: text(),
  refreshToken: text(),
});
```

with commands

```sh
    "drizzle:gen": "drizzle-kit generate",// generates the migratons sql files
    "drizzle:migrate": "drizzle-kit migrate ", // runs the migrations
    "drizzle:push": "drizzle-kit push ", //push the changes to the database directly
    "drizzle:studio": "drizzle-kit studio",// open the drizzle studio to visualize you db
```

coupled with `drizzle-zod` to generate the zod schemas for the tables

```ts
export const helloSelectSchema = createSelectSchema(helloTable);
export const helloInsertSchema = createInsertSchema(helloTable);
export const helloUpdateSchema = createUpdateSchema(helloTable);
```

### Routing strategy

The zod schemas are the used with [hono-zod-openapi](https://hono.dev/examples/zod-openapi)
to validate requests and responses and generate athe swagger doc

```ts
export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Inventory API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
```

example route

```ts
// index.ts

const route = createRouter().openapi(
  createRoute({
    tags: ["Home"],
    method: "get",
    path: "/api/v1",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        baseResponseSchema.extend({
          result: z.object({
            message: z.string(),
          }),
          error: z.null().optional(),
        }),
        "Welcome to the Inventory API",
      ),
    },
  }),
  async (c) => {
    return c.json(
      {
        error: null,
        result: {
          message: "Welcome to the Inventory API",
        },
      },
      HttpStatusCodes.OK,
    );
  },
);
;
//  app.ts
const app = createApp();
app.route("/", route);
export default app;

// import { serve } from "@hono/node-server";

// import app from "./app";
// import { envVariables } from "./env";

const port = envVariables.PORT;
// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
```

### Auth stategy

- user signs up with email password
- `bcypt` is used to hash password and save it to the db with the malil marked as unverified
- user is redirected to email verification page
- user uses the token sent to the email to verify the email
- user is redirected to the home page with the access token and refresh token httpOnly cookie
- the fronend hits the `auth/me` endpoint to get the user details out of the cookie
- if the access token is expired and the refresh token is valide the `authenticateUserMiddleware` middleware will refresh the access token and set it in the cookie
- forgot password and reset password enpoints exist too.

### Logging stategy

uses `pino` coupled with the honojs logger middleware which is passed down using `hono/context` (a wrapper around nodejs [AsyncLocalStorage](https://nodejs.org/api/async_context.html)
which makes avaiable accrioo the app by calling

```ts
c.var.logger.info("message");
```

### Data strategies

Most of the data is fetchec through the `BaseCrudService`
To make pagination and error handling easy the list endpoints respond with

```ts
interface SuccessListResponse<T> {
  error: null;
  result: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
  };
}
interface ErrorResponse<T> {
  error: {
    messgae: string;
    status: number;
    data: Array<record<string, any>>;
  };
  result: null;
}
```

This resultor error pattern applie to all routes ,

[base-crup-service](https://github.com/tigawanna/inventory-management/blob/788042b4e2716b1f108e9fece9b0c950399586f4/apps/hono/src/services/base-crud-service.ts)
an abstraction to help quickey scafold api routes of `GET`, `POST`, `PUT`, `DELETE` and `PATCH`

it can be extended for custom behavior

```ts
// categories required to be filtered by name or categoryId
export class CategoriesService extends BaseCrudService<
      typeof categoriesTable,
  z.infer<typeof categoriesInsertSchema>,
  z.infer<typeof categoriesUpdateSchema>
> {
  constructor() {
    super(categoriesTable, entityType.CATEGORY);
  }

  // Override or add custom methods
  override async findAll(query: z.infer<typeof listCategoriesQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = or(
      search ? ilike(categoriesTable.name, `%${search}%`) : undefined,
      search ? ilike(categoriesTable.id, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
```

Inside this abstraction audit logs and caching is perfoemd to increase `DRY`ness

```ts
// example of audit logiing,structured logging and caching
export class BaseCrudService<T extends PgTable<any>, CreateDTO extends Record<string, any>, UpdateDTO extends Record<string, any>> {
  protected table: T;
  protected entityType: EntityType;
  private auditLogService: AuditLogService;

  constructor(table: T, entityType: EntityType) {
    this.table = table;
    this.entityType = entityType;
    this.auditLogService = new AuditLogService();
  }
  async findById(id: string): Promise<FindOneReturnType<T>["item"]> {
    const c = getContext<AppBindings>();
    const cacheKey = `findById:${id}`;
    const cachedResult = await cacheService.get(cacheKey);

    if (cachedResult) {
      c.var.logger.info(`Cache hit for ${cacheKey}`);
      return JSON.parse(cachedResult);
    }
    c.var.logger.warn(`Cache miss for ${cacheKey}`);
    const item = await db
      .select()
      .from(this.table)
    // TODO : extend type PgTable with a narrower type which always has an ID column
      // @ts-expect-error : the type is too genrric but shape matches
      .where(eq(this.table.id, id))
      .limit(1);
    const result = item[0];
    await cacheService.set(cacheKey, JSON.stringify(result), 60 * 5); // Cache for 5 minutes
    c.var.logger.info(`Cache set for ${cacheKey}`);
    return result;
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
```

The structred logs could be vased to disk later on but the audit logs are saved to the DB

### Docker

# Docker commands

The app can run using local nodejs but a docker setup is also possible

> [!NOTE]
> These commands should be run from the root directory of the monorepo

1. Build the image (current command)

```sh
   sudo docker build -t inventory-hono -f apps/hono/Dockerfile .

```

2. Run the container

```sh
   sudo docker run -d \
     --name inventory-hono-api \
     -p 5000:80 \
     inventory-hono
```

3. Verify container is running

```sh
    sudo docker ps
```

4. Check logs if needed

```sh
    sudo docker logs inventory-hono-api
```

5. Access the application
   Open browser at [http://localhost:5000](http://localhost:5000)

6. Stop and remove the container

```sh
    sudo docker stop inventory-hono-api
    sudo docker rm inventory-hono-api
```
