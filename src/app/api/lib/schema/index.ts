import { NextResponse } from "next/server";
import { ZodRawShape, z } from "zod";

export function schemaValidator(schema: ZodRawShape, data: any) {
  try {
    z.object(schema).parse(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
}
