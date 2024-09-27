import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body: { isAccepted: boolean } = await req.json();

  try {
    const acceptRider = await prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        isAccepted: body.isAccepted,
      },
    });

    return NextResponse.json(acceptRider, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to accept link" },
      { status: 500 }
    );
  }
}
