import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/token";

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  await prisma.whatsapp.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
