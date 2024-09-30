import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Route handler
export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  const { teacherId } = params;

  try {
    // Fetch lessons by stableId from the database
    const lessons = await prisma.lesson.findMany({
      where: { stableId: teacherId },
    });

    // Return a successful response with the lessons
    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    // Handle errors and return a 500 status with the error message
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
