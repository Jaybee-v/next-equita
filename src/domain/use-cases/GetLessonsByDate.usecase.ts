import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonsByDateUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  execute(date: string): Promise<Lesson[]> {
    return this.lessonRepository.getLessonsByDate(date);
  }
}
