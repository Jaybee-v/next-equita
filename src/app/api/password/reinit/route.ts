import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";

const reinitPasswordSchema = z.object({
  id: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const reinitPassword = reinitPasswordSchema.parse(body);
  try {
    const createReinitPassword = await prisma.reinitPassword.create({
      data: {
        userId: reinitPassword.id,
        maxValidityDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        maxValidityDate: true,
      },
    });

    const token = await hashPassword(createReinitPassword.id);
    console.log(token);

    return NextResponse.json(createReinitPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données d'entrée invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la création du mot de passe",
      },
      { status: 500 }
    );
  }
}
