import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
// import { Prisma } from "@prisma/client";

const lessonSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  type: z.string(),
  date: z.date(),
  start: z.string(),
  end: z.string(),
  stableId: z.string(),
  // price: z.number().int().positive(),
  isPublic: z.boolean(),
  emptyPlaces: z.number(),
  requiredLevel: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lesson = lessonSchema.parse({
      ...body,
      date: new Date(body.date),
    });

    const createLesson = await prisma.lesson.create({
      data: {
        title: lesson.title,
        description: lesson.description,
        type: lesson.type,
        date: new Date(lesson.date),
        start: lesson.start,
        end: lesson.end,
        isPublic: lesson.isPublic,
        emptyPlaces: lesson.emptyPlaces,
        stableId: lesson.stableId,
        requiredLevel: lesson.requiredLevel,
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        date: true,
        start: true,
        end: true,
        isPublic: true,
        emptyPlaces: true,
        createdAt: true,
      },
    });

    return NextResponse.json(createLesson, { status: 201 });
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
        error: "Une erreur est survenue lors de la création de la leçon.",
      },
      { status: 500 }
    );
  }
}
