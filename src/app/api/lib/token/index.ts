import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export function getToken() {
  const getCookies = cookies();
  const nextAuthSession =
    getCookies.get("next-auth.session-token")?.value || "";

  return nextAuthSession;
}

const secret = String(process.env.SECRET);

export async function getUser() {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const user = jwt.verify(token, secret);

  return user as User;
}
