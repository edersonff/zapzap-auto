import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const plans: Prisma.PlanCreateInput[] = [
  {
    name: "Basic",
    description: "Basic plan",
    price: 0,
    status: "active",
  },
  {
    name: "Pro",
    description: "Pro plan",
    price: 99.9,
    status: "active",
  },
  {
    name: "Enterprise",
    description: "Enterprise plan",
    price: 200,
    status: "active",
  },
];

export async function POST() {
  await prisma.plan.createMany({
    data: plans,
  });

  return NextResponse.json({
    created: true,
  });
}
