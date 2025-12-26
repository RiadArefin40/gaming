// lib/auth.ts

export interface User {
  username: string;
  password?: string;
  name: string;
  id:number;
  wallet:number;

}



/**
 * Logs in a user and saves it in localStorage
 */
export function loginUser(user: User | null) {
  if (typeof window === "undefined") return null; // client-only
  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
    return user;
  }
  return null;
}

/**
 * Logs out the user
 */
export function logoutUser() {
  if (typeof window === "undefined") return; // client-only
  localStorage.removeItem("auth_user");
}

/**
 * Gets the currently logged in user from localStorage
 */
export function getAuthUser(): User | null {
  if (typeof window === "undefined") return null; // SSR safe
  const data = localStorage.getItem("auth_user");
  return data ? (JSON.parse(data) as User) : null;
}
