
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
