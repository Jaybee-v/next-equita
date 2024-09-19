"use client";
import { CreateUserDto } from "@/domain/dtos/create-user.dto";
import { User } from "@/domain/entities/User";

export const userApi = {
  async save(user: CreateUserDto): Promise<User> {
    const createdUser = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(createdUser);
    const data = await createdUser.json();
    console.log(data);
    if (createdUser.status === 201) {
      return data;
    }
    throw new Error(data.error);
  },
};
