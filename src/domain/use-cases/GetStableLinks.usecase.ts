import { Link } from "../entities/Link";
import { LinkRepository } from "../repositories/LinkRepository";

export class GetStableLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(stableId: string): Promise<Link[]> {
    return this.linkRepository.getStableLinks(stableId);
  }
}
