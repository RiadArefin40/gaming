"use client";

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
  localStorage.removeItem("auth_user");
}

/**
 * Gets the currently logged in user from localStorage
 */
export function getAuthUser(): User | null {
  const data = localStorage.getItem("auth_user");
  return data ? (JSON.parse(data) as User) : null;
}
