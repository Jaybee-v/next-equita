import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonByIdUseCase {
  constructor(private lessonRepository: LessonRepository) {}
  execute(id: string) {
    return this.lessonRepository.getLessonById(id);
  }
}
