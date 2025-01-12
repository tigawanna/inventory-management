import { db } from "@/db/client.ts";
import { usersTable } from "@/db/schema/users.ts";
import { eq } from "drizzle-orm";



/**
 * Find a user by their ID.
 * @param id The ID of the user
 * @returns The user if found, otherwise null
 */
export async function findUserByID(id: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  return user;
}



/**
 * Increment the refreshTokenVersion of a user. This is used to invalidate
 * refresh tokens issued to a user.
 * @param userId The id of the user
 * @returns The updated user
 * @throws {Error} If the user is not found
 */
export async function bumpUserTokenVersion(userId: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
  });
  if (!user) throw new Error("User not found");
  const newUser = await db
    .update(usersTable)
    .set({ refreshTokenVersion: (user?.refreshTokenVersion ?? 1) + 1 })
    .where(eq(usersTable.id, user.id))
    .returning();
  return newUser[0];
}
