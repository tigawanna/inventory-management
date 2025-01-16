import { timestamp, text } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";
export const commonColumns = {
  id: text()
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow(),
};
