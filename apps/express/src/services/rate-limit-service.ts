import kvjs from "@heyputer/kv.js";

export async function rateLimit(userid: string) {
  // in meory kv
  const kv = new kvjs();
  const rateLimit = await kv.get(userid);
  if (rateLimit) {
    return true;
  }
  // set the rate limit for 100 seconds
  await kv.expire(userid, 100);
  return false;
}
