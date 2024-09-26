import { CreateLinkDto } from "@/domain/dtos/create-link.dto";
import { Link } from "@/domain/entities/Link";

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

  async getStableLinks(id: string): Promise<Link[]> {
    const links = await fetch(`/api/link/stable/${id}`);

    if (links.status === 200) {
      return links.json();
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
