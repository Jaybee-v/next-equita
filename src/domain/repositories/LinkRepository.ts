import { CreateLinkDto } from "../dtos/create-link.dto";
import { Link } from "../entities/Link";

export interface LinkRepository {
  save(link: CreateLinkDto): Promise<Link>;
  getRiderLink(riderId: string): Promise<Link[]>;
}
