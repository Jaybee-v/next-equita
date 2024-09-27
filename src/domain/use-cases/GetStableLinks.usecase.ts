import { Rider } from "../entities/Rider";
import { LinkRepository } from "../repositories/LinkRepository";

export class GetStableLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(stableId: string): Promise<Rider[]> {
    return this.linkRepository.getStableLinks(stableId);
  }
}
