import { CreateUserDto } from "@/domain/dtos/create-user.dto";
// import { User } from "@/domain/entities/User";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user: CreateUserDto = await req.json();
  try {
    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        password: user.password,
      },
    });

    return NextResponse.json(createUser);
  } catch (error) {
    throw new Error();
  }
}
