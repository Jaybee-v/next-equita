import { LinkRepository } from "../repositories/LinkRepository";

export class DeleteLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute(id: number): Promise<void> {
    return this.linkRepository.deleteLink(id);
  }
}
