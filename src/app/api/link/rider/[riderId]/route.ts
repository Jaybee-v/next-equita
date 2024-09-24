import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { riderId: string } }
) {
  const { riderId } = params;

  try {
    const links = await prisma.link.findMany({
      where: { riderId },
      orderBy: { isPrimay: "desc" },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
