import { LinkRepository } from "../repositories/LinkRepository";

export class GetRiderLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(riderId: string) {
    return this.linkRepository.getRiderLink(riderId);
  }
}
