import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const socials = await prisma.social.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(socials);
}

export async function POST(req: NextRequest) {
  const { type, token, user, password } = await req.json();

  const socials = await prisma.social.create({
    data: {
      type,
      token,
      user,
      password,
    },
  });

  return NextResponse.json(socials);
}
