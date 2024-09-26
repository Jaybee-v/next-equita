import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const reinitPassword = await prisma.reinitPassword.findUnique({
      where: {
        id: id,
      },
    });

    if (!reinitPassword) {
      return NextResponse.json(
        { error: "Reinit password not found" },
        { status: 404 }
      );
    }

    if (new Date() > reinitPassword.maxValidityDate) {
      return NextResponse.json(
        { error: "Reinit password expired" },
        { status: 400 }
      );
    }

    return NextResponse.json(reinitPassword, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { password } = await req.json();

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
  }
}
