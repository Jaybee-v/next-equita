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
};
