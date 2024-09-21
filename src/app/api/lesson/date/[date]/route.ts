import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { date: string } }
) {
  const { date } = params;

  // Valider le format de la date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching lessons for date:", date);

    const lessons = await prisma.lesson.findMany({
      where: { date: new Date(date) },
    });

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
