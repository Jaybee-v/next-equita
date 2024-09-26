import { LessonRepository } from "../repositories/LessonRepository";

export class DeleteLessonUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  async execute(id: string): Promise<void> {
    return this.lessonRepository.deleteLesson(id);
  }
}
