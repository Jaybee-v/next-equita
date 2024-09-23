import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";

const linkSchema = z.object({
  riderId: z.string(),
  stableId: z.string().optional(),
  teacherId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const link = linkSchema.parse(body);

    const createLink = await prisma.link.create({
      data: {
        riderId: link.riderId,
        stableId: link.stableId,
        teacherId: link.teacherId,
      },
      select: {
        id: true,
        riderId: true,
        stableId: true,
        teacherId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(createLink, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données d'entrée invalides", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Une erreur s'est produite" },
      { status: 500 }
    );
  }
}
