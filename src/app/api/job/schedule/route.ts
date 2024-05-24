import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { DateTime } from "luxon";
import { Bulk, BulkType, Whatsapp } from "@prisma/client";
import { Message } from "../../lib/message";

const runEach = 15 * 60;

export async function POST() {
  const bulks = await prisma.bulk.findMany({
    where: {
      type: {
        not: "now",
      },
    },
    include: {
      whatsapp: true,
    },
  });

  for (const bulk of bulks) {
    const lastRun = bulk.lastRun
      ? DateTime.fromJSDate(bulk.lastRun)
      : DateTime.fromJSDate(bulk.createdAt);
    const time = DateTime.fromJSDate(bulk.time);

    let shouldRun = false;

    switch (bulk.type) {
      case "hourly":
        shouldRun = DateTime.now() > lastRun.plus({ hours: 1 });
        break;

      case "daily":
        shouldRun = DateTime.now() > lastRun.plus({ days: 1 });
        break;

      case "weekly":
        shouldRun = DateTime.now() > lastRun.plus({ weeks: 1 });
        break;

      case "monthly":
        shouldRun = DateTime.now() > lastRun.plus({ months: 1 });
        break;

      case "yearly":
        shouldRun = DateTime.now() > lastRun.plus({ years: 1 });
        break;

      case "specific":
        shouldRun = DateTime.now() > time;
        break;
    }

    if (!shouldRun) {
      continue;
    }

    await handleBulk(bulk);
  }

  return NextResponse.json({
    message: "Bulks enviados com sucesso",
  });
}

async function handleBulk(bulk: Bulk & { whatsapp: Whatsapp }) {
  const message = new Message(bulk, bulk.whatsapp.number);
  await message.send();

  await prisma.bulk.update({
    where: {
      id: bulk.id,
    },
    data: {
      lastRun: new Date(),
    },
  });
}
