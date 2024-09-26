import { CreateLinkDto } from "../dtos/create-link.dto";
import { Link } from "../entities/Link";

export interface LinkRepository {
  save(link: CreateLinkDto): Promise<Link>;
  getRiderLink(riderId: string): Promise<Link[]>;
  getStableLinks(stableId: string): Promise<Link[]>;
  deleteLink(id: number): Promise<void>;
}
