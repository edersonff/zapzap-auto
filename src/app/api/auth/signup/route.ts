import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { Bcrypt } from "../../lib/bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, phone, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        message: "Email já cadastrado",
      },
      {
        status: 404,
      }
    );
  }

  const hashedPassword = Bcrypt.hash(password);

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    created: true,
  });
}
