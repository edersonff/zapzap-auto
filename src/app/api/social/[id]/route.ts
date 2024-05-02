import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.social.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ success: true });
}
