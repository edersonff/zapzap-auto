import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { getUser } from "../lib/token";

export async function GET() {
  const user = await getUser();
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
    },

    select: {
      id: true,
      planId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(subscription);
}
