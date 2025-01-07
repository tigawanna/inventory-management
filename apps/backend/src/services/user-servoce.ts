import { db } from "@/db/client.ts";
import { usersTable } from "@/db/schema/users.ts";
import { eq } from "drizzle-orm";
import { type CreateNewUserSchema } from "@/schemas/user-schema.ts";
interface FindUsersProps {
  page?: number;
  perPage?: number;
}
/**
 * Find all users.
 * @param {FindUsersProps} [props] Page and per-page options
 * @param {number} [props.page=1] Page of results to return
 * @param {number} [props.perPage=24] Number of results per page
 * @returns {Promise<User[]>} Array of users
 */
export async function findUsers({ page = 1, perPage = 24 }: FindUsersProps) {
  const users = await db.query.usersTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  });
  return users;
}

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
 * Find a user by their email address.
 * @param email The email address to search for
 * @returns The user if found, otherwise null
 */
export async function findUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
  return user;
}

export async function createNewUser(newUser: CreateNewUserSchema) {
  return await db
    .insert(usersTable)
    .values({ ...newUser })
    .returning();
}

export async function getUserByRefreshToken(refreshToken: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.refreshToken, refreshToken),
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
