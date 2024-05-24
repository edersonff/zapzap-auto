import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { error } = Object.fromEntries(req.nextUrl.searchParams);

  const baseUrl = req.nextUrl.origin + "/error/redirect";
  const params = new URLSearchParams();

  params.append("link", "/auth/signin");

  switch (error) {
    case "No User found":
      params.append("message", "Usuário não encontrado");
      params.append("status", "404");
      break;
  }

  return NextResponse.redirect(baseUrl + "?" + params.toString());
}
