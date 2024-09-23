import { CreateLinkDto } from "../dtos/create-link.dto";
import { Link } from "../entities/Link";
import { LinkRepository } from "../repositories/LinkRepository";

export class CreateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  execute(link: CreateLinkDto): Promise<Link> {
    return this.linkRepository.save(link);
  }
}
