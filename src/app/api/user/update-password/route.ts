import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { newPassword, id } = await req.json();

  try {
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
