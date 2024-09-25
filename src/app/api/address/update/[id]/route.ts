import { UpdateAddressDto } from "@/domain/dtos/update-address.dto";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body: UpdateAddressDto = await req.json();

  try {
    const updatedUser = await prisma.address.update({
      where: { id },
      data: {
        street: body.street,
        city: body.city,
        country: body.country,
        zipCode: body.zipCode,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
