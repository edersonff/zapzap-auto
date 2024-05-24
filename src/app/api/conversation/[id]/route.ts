import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/token";

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json(conversation);
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  await prisma.conversation.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
