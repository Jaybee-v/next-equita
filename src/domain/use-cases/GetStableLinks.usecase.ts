import { User } from "../entities/User";
import { LinkRepository } from "../repositories/LinkRepository";

export class GetStableLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(stableId: string): Promise<User[]> {
    return this.linkRepository.getStableLinks(stableId);
  }
}
