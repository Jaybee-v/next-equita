import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonByStableIdUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  execute(stableId: string): Promise<Lesson[]> {
    return this.lessonRepository.getLessonByStableId(stableId);
  }
}
