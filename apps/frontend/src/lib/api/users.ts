import { error } from "console";

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

export interface CreateInventoryUser {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: "user" | "admin";
}
export interface LoginInventoryUser {
  email: string;
  password: string;
}

const authEndponts = {
  me: "/api/v1/auth/me",
  signin: "/api/v1/auth/signin",
  signup: "/api/v1/auth/signup",
  logout: "/api/v1/auth/logout",
  "verify-email": "/api/v1/auth/verify-email",
  "refresh-token": "/api/v1/auth/refresh-token",
  "forgot-password": "/api/v1/auth/forgot-password",
  "reset-password": "/api/v1/auth/reset-password",
} as const;

export interface AuthEnpointsEroor{
  error: string;
  message: string
  code?:string
}

const baseUrl = import.meta.env.VITE_API_URL;
export async function getCurrentUser() {
  try {
    const res = await fetch(baseUrl + authEndponts.me, {
      credentials: "include",
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryUser, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}

export async function signUpUser(user: CreateInventoryUser) {
  try {
    const res = await fetch(baseUrl + authEndponts.signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryUser, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}
export async function signInUser(user: LoginInventoryUser) {
  try {
    const res = await fetch(baseUrl + authEndponts.signin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryUser, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}

export async function verifyEmail(token: string) {
  try {
    const res = await fetch(
      baseUrl + authEndponts["verify-email"] + `?token=${token}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryUser, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(baseUrl + authEndponts.logout, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryUser, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}
