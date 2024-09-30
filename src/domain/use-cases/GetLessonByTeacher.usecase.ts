import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonByTeacherUseCase {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async execute(teacherId: string): Promise<Lesson[]> {
    return this.lessonRepository.findByTeacher(teacherId);
  }
}
