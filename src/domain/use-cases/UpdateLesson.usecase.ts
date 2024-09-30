import { UpdateLessonDto } from "../dtos/update-lesson.dto";
import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class UpdateLessonUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  async execute(id: string, lesson: UpdateLessonDto): Promise<Lesson> {
    return this.lessonRepository.updateLesson(id, lesson);
  }
}
