
export interface InventoryUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: "user" | "admin";
  refreshToken?: string;
  refreshTokenVersion: number;
  verificationToken?: string;
  isEmailVerified: boolean;
}

const authEndponts  = {
  me:"/api/v1/auth/me",
  signin:"/api/v1/auth/signin",
  signup:"/api/v1/auth/signup",
  logout:"/api/v1/auth/logout",
  "verify-email":"/api/v1/auth/verify-email",
  "refresh-token":"/api/v1/auth/refresh-token",
}

export async function getCurrentUser(){

}
