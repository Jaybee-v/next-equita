import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { hashPassword } from "@/lib/bcrypt";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  lastname: z.string(),
  role: z.enum(["rider", "stable", "teacher"]),
  password: z.string().min(8),
  level: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = userSchema.parse(body);

    const hashedPassword = await hashPassword(user.password);

    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        password: hashedPassword,
        level: user.level,
      },
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(createUser, { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données d'entrée invalides", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Un utilisateur avec cet email existe déjà." },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la création de l'utilisateur.",
      },
      { status: 500 }
    );
  }
}
