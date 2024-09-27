import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  const _id = parseInt(id as unknown as string);

  try {
    await prisma.link.delete({
      where: { id: _id },
    });

    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
