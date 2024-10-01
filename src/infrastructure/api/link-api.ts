import { CreateLinkDto } from "@/domain/dtos/create-link.dto";
import { Link } from "@/domain/entities/Link";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";
import { Rider } from "@/domain/entities/Rider";

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
    console.log(links);

    if (links.status === 200) {
      return links.json();
    }

    throw new Error("Failed to fetch links");
  },

  async getStableLinks(id: string): Promise<Rider[]> {
    const response = await fetch(`/api/link/stable/${id}`);

    if (response.status === 200) {
      const links = await response.json();
      const users: Rider[] = [];
      for (const link of links) {
        const userRepository = new UserRepositoryImpl();
        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        const user = await getUserByIdUseCase.execute(link.riderId);
        const rider: Rider = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname!,
          linkId: link.id,
          level: user.level!,
          isAccepted: link.isAccepted,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        };
        users.push(rider);
      }
      return users;
    }

    throw new Error("Failed to fetch links");
  },

  async getTeacherLinks(id: string): Promise<Rider[]> {
    const response = await fetch(`/api/link/teacher/${id}`);

    if (response.status === 200) {
      const links = await response.json();
      const users: Rider[] = [];
      for (const link of links) {
        const userRepository = new UserRepositoryImpl();
        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        const user = await getUserByIdUseCase.execute(link.riderId);
        const rider: Rider = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname!,
          linkId: link.id,
          level: user.level!,
          isAccepted: link.isAccepted,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        };
        users.push(rider);
      }
      return users;
    }

    throw new Error("Failed to fetch links");
  },

  async acceptLinkByStable(id: number, isAccepted: boolean): Promise<void> {
    const updatedLink = await fetch(`/api/link/accept/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAccepted }),
    });

    if (updatedLink.status === 200) {
      return;
    }

    throw new Error("Failed to accept link");
  },

  async deleteLink(id: number): Promise<void> {
    const deletedLink = await fetch(`/api/link/delete/${id}`, {
      method: "DELETE",
    });
    console.log(deletedLink);

    if (deletedLink.status === 200) {
      return;
    }

    throw new Error("Failed to delete link");
  },
};
