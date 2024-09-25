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

  async getUserByName(
    name: string
  ): Promise<User[] | { message: string; users: User[] }> {
    const response = await fetch(`/api/user/by-name/${name}`);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`http://localhost:3000/api/user/${id}`);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async updateAccount(
    id: string,
    updatedUser: { name: string; lastname?: string; email: string }
  ): Promise<User> {
    const response = await fetch(`/api/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },
};
