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
  me: "/api/auth/me",
  signin: "/api/auth/signin",
  signup: "/api/auth/signup",
  logout: "/api/auth/signout",
  "verify-email": "/api/auth/verify-email",
  "refresh-token": "/api/auth/refresh-token",
  "forgot-password": "/api/auth/forgot-password",
  "reset-password": "/api/auth/reset-password",
  "request-reset": "/api/auth/request-email-verification",
} as const;

export interface AuthEnpointsEroor {
  error: string;
  message: string;
  code?: string;
}

export interface UserSigninResponse {
  result: InventoryUser;
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
          .then((res) => res.error)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    const response = (await res.json()) as { result: InventoryUser };
    return { record: response.result, error: null };
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
          .then((res) => res?.error)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    const response = (await res.json()) as { result: InventoryUser };
    console.log("signupUser response  ====", response.result);
    return { record: response.result, error: null };
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
      },
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
export async function requestEmailVerification(email: string) {
  try {
    const res = await fetch(baseUrl + authEndponts["verify-email"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email } as ForgotPasswordRequest),
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

interface ResetPasswordRequest {
  token: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

export async function requestPasswordReset(email: string) {
  try {
    const res = await fetch(baseUrl + authEndponts["request-reset"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email } as ForgotPasswordRequest),
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
    return { record: await res.json(), error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const res = await fetch(baseUrl + authEndponts["reset-password"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token, password } as ResetPasswordRequest),
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
    return { record: await res.json(), error: null };
  } catch (error) {
    return {
      record: null,
      error: error as AuthEnpointsEroor,
    };
  }
}
