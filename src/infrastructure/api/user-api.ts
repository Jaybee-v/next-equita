"use client";
import { CreateUserDto } from "@/domain/dtos/create-user.dto";
import { User } from "@/domain/entities/User";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { GetUserPasswordUseCase } from "@/domain/use-cases/GetUserPassword.usecase";
import { comparePassword } from "@/lib/bcrypt";
import { signIn } from "next-auth/react";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";
import { AddressRepositoryImpl } from "../repositories/AddressRepositoryImpl";
import { DeleteAddressUseCase } from "@/domain/use-cases/DeleteAddress.usecase";
import { LessonRepositoryImpl } from "../repositories/LessonRepositoryImpl";
import { GetLessonByStableIdUseCase } from "@/domain/use-cases/GetLessonByStableId.usecase";
import { DeleteLessonUseCase } from "@/domain/use-cases/DeleteLesson.usecase";

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

  async getUserPassword(id: string): Promise<string> {
    const response = await fetch(`/api/user/get-password/${id}`);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      return data.password;
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

  async updatePassword(
    id: string,
    actualPassword: string,
    newPassword: string
  ): Promise<User> {
    const userRepository = new UserRepositoryImpl();
    const getUserPasswordUseCase = new GetUserPasswordUseCase(userRepository);
    const password = await getUserPasswordUseCase.execute(id);

    const comparedPasswords = await comparePassword(actualPassword, password);

    if (!comparedPasswords) {
      throw new Error("Invalid password");
    }

    const response = await fetch(`/api/user/update-password`, {
      method: "PATCH",
      body: JSON.stringify({ id, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      await signIn("credentials", {
        password: newPassword,
        email: data.email,
        redirect: false,
      });
      return data;
    }
    throw new Error(data.error);
  },

  async deleteAccount(id: string, password: string): Promise<void> {
    const userRepository = new UserRepositoryImpl();
    const getUserPasswordUseCase = new GetUserPasswordUseCase(userRepository);
    const getPassword = await getUserPasswordUseCase.execute(id);

    const comparedPasswords = await comparePassword(password, getPassword);

    if (!comparedPasswords) {
      throw new Error("Invalid password");
    }
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const user = await getUserByIdUseCase.execute(id);

    if (user.role === "stable") {
      const addressRepository = new AddressRepositoryImpl();
      const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
      await deleteAddressUseCase.execute(user.address!.id);

      const lessonRepository = new LessonRepositoryImpl();
      const getLessonByStableIdUseCase = new GetLessonByStableIdUseCase(
        lessonRepository
      );
      const lessons = await getLessonByStableIdUseCase.execute(user.id);
      const deleteLessonUseCase = new DeleteLessonUseCase(lessonRepository);
      for (const lesson of lessons) {
        await deleteLessonUseCase.execute(lesson.id);
      }
    }

    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      return;
    }
    throw new Error(data.error);
  },
};
