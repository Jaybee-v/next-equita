import { CreateReinitPasswordDto } from "@/domain/dtos/create-reinit-password.dto";
import { ReinitPassword } from "@/domain/entities/ReinitPassword";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { GetUserByEmailUseCase } from "@/domain/use-cases/GetUserByEmail.usecase";
import { User } from "@/domain/entities/User";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";

export const reinitPasswordApi = {
  async save(reinitPassword: CreateReinitPasswordDto): Promise<ReinitPassword> {
    const { email } = reinitPassword;

    const userRepository = new UserRepositoryImpl();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);
    console.log("email", email);

    const user = await getUserByEmail.execute(email);
    console.log("user", user);

    if (!user) {
      throw new Error("User not found");
    }

    const createdReinitPassword = await fetch("/api/password/reinit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    });
    const data = await createdReinitPassword.json();

    if (createdReinitPassword.status === 201) {
      return data;
    }
    throw new Error(data.error);
  },

  async getById(id: string): Promise<User> {
    const response = await fetch(`/api/password/reinit/${id}`);
    const data = await response.json();

    if (response.status === 200) {
      const userRepository = new UserRepositoryImpl();
      const getUserById = new GetUserByIdUseCase(userRepository);
      const user = await getUserById.execute(data.userId);
      return user;
    }
    throw new Error(data.error);
  },
};
