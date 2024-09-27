import { CreateLinkDto } from "../dtos/create-link.dto";
import { Link } from "../entities/Link";
import { Rider } from "../entities/Rider";

export interface LinkRepository {
  save(link: CreateLinkDto): Promise<Link>;
  getRiderLink(riderId: string): Promise<Link[]>;
  getStableLinks(stableId: string): Promise<Rider[]>;
  acceptLinkByStable(id: number, isAccepted: boolean): Promise<void>;
  deleteLink(id: number): Promise<void>;
}
