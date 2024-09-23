import { CreateLinkDto } from "@/domain/dtos/create-link.dto";
import { Link } from "@/domain/entities/Link";
import { LinkRepository } from "@/domain/repositories/LinkRepository";
import { linkApi } from "../api/link-api";

export class LinkRepositoryImpl implements LinkRepository {
  async save(link: CreateLinkDto): Promise<Link> {
    return linkApi.save(link);
  }

  async getRiderLink(riderId: string): Promise<Link[]> {
    return linkApi.getRiderLinks(riderId);
  }
}
