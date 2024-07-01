import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { getUser } from "../../lib/token";
import { DateTime } from "luxon";

export async function GET() {
  const user = await getUser();
  const [month, year]: string[] = DateTime.now().toFormat("MM-yyyy").split("-");

  const usage = await prisma.usage.findFirst({
    where: {
      userId: user.id,
      month: +month,
      year: +year,
    },
  });

  return NextResponse.json(usage || { totalMessages: 0 });
}
