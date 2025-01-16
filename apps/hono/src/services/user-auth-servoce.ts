import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { usersTable } from "@/db/schema/users";

export async function findUserByID(id: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  return user;
}

export async function bumpUserTokenVersion(userId: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
  });
  if (!user)
    return;
  const newUser = await db
    .update(usersTable)
    .set({ refreshTokenVersion: (user?.refreshTokenVersion ?? 1) + 1 })
    .where(eq(usersTable.id, user.id))
    .returning();
  return newUser[0];
}
