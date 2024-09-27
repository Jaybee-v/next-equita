import { CreateLinkDto } from "../dtos/create-link.dto";
import { Link } from "../entities/Link";
import { User } from "../entities/User";

export interface LinkRepository {
  save(link: CreateLinkDto): Promise<Link>;
  getRiderLink(riderId: string): Promise<Link[]>;
  getStableLinks(stableId: string): Promise<User[]>;
  deleteLink(id: number): Promise<void>;
}
