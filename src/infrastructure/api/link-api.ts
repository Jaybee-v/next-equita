import { CreateLinkDto } from "@/domain/dtos/create-link.dto";
import { Link } from "@/domain/entities/Link";
import { User } from "@/domain/entities/User";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";

export const linkApi = {
  async save(link: CreateLinkDto): Promise<Link> {
    const createdLink = await fetch("/api/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(link),
    });

    const data = await createdLink.json();

    if (createdLink.status === 201) {
      return data;
    }

    throw new Error(data.error);
  },

  async getRiderLinks(id: string): Promise<Link[]> {
    const links = await fetch(`http://localhost:3000/api/link/rider/${id}`);

    if (links.status === 200) {
      return links.json();
    }

    throw new Error("Failed to fetch links");
  },

  async getStableLinks(id: string): Promise<User[]> {
    const response = await fetch(`/api/link/stable/${id}`);

    if (response.status === 200) {
      const links = await response.json();
      const users: User[] = [];
      for (const link of links) {
        const userRepository = new UserRepositoryImpl();
        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        const user = await getUserByIdUseCase.execute(link.riderId);
        users.push(user);
      }
      return users;
    }

    throw new Error("Failed to fetch links");
  },

  async deleteLink(id: number): Promise<void> {
    const deletedLink = await fetch(`/api/link/delete/${id}`, {
      method: "DELETE",
    });

    if (deletedLink.status === 200) {
      return;
    }

    throw new Error("Failed to delete link");
  },
};
