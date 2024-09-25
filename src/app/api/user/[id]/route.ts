import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Route handler
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch lessons by stableId from the database
    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, lastname, email } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, lastname, email },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
