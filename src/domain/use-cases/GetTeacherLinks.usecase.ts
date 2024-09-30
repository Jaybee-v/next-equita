import { LinkRepository } from "../repositories/LinkRepository";

export class GetTeacherLinksUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute(teacherId: string) {
    return this.linkRepository.getTeacherLinks(teacherId);
  }
}
