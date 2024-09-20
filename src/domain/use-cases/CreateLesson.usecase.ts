import { CreateLessonDto } from "../dtos/create-lesson.dto";
import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class CreateLessonUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  execute(lesson: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.save(lesson);
  }
}
