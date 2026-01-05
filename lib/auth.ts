"use client";

export interface User {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

/**
 * Save user to localStorage
 */
export function loginUser(user: User | null) {
  // if (typeof window === "undefined") return null;

  // if (user) {
  //   localStorage.setItem("auth_user", JSON.stringify(user));
  //   return user;
  // }
  return null;
}

/**
 * Remove user
 */
export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_user");
}

/**
 * Get user safely (CLIENT ONLY)
 */
export function getAuthUser(): User | null {
  // if (typeof window === "undefined") return null;

  // try {
  //   const data = localStorage.getItem("auth_user");
  //   return data ? (JSON.parse(data) as User) : null;
  // } catch (err) {
  //   console.error("Invalid auth_user data", err);
    return null;
  
}
