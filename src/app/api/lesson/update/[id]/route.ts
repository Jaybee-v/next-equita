import { UpdateLessonDto } from "@/domain/dtos/update-lesson.dto";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body: UpdateLessonDto = await req.json();

  try {
    const updatedLesson = await prisma.lesson.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        type: body.type,
        date: body.date,
        start: body.start,
        end: body.end,
        isPublic: body.isPublic,
        emptyPlaces: body.emptyPlaces,
        requiredLevel: body.requiredLevel,
      },
    });
    return NextResponse.json(updatedLesson, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}
