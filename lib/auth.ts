// lib/auth.ts
export const STATIC_USER = {
  username: "admin",
  password: "123456",
  name: "Admin User",
};

export function loginUser(username: string, password: string) {
  if (
    username === STATIC_USER.username &&
    password === STATIC_USER.password
  ) {
    const user = { username, name: STATIC_USER.name };
    localStorage.setItem("auth_user", JSON.stringify(user));
    return user;
  }
  return null;
}

export function logoutUser() {
  localStorage.removeItem("auth_user");
}

export function getAuthUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("auth_user");
  return data ? JSON.parse(data) : null;
}
