import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch lessons by stableId from the database
    const user = await prisma.lesson.findUnique({
      where: { id },
    });

    // Return a successful response with the lessons
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle errors and return a 500 status with the error message
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
