import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";

const addressSchema = z.object({
  street: z.string().min(2),
  city: z.string().min(2),
  zipCode: z.string().min(2).max(5),
  country: z.string().min(2),
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const address = addressSchema.parse(body);

    const createAddress = await prisma.address.create({
      data: {
        street: address.street,
        city: address.city,
        zipCode: address.zipCode,
        country: address.country,
        userId: address.userId,
      },
      select: {
        id: true,
        street: true,
        city: true,
        zipCode: true,
        country: true,
        userId: true,
      },
    });

    return NextResponse.json(createAddress, { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données d'entrée invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite." },
      { status: 500 }
    );
  }
}
