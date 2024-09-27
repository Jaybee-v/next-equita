import { LinkRepository } from "../repositories/LinkRepository";

export class AcceptLinkByStableUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(id: number, isAccepted: boolean): Promise<void> {
    return this.linkRepository.acceptLinkByStable(id, isAccepted);
  }
}
