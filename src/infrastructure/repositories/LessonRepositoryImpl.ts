import { CreateLessonDto } from "@/domain/dtos/create-lesson.dto";
import { Lesson } from "@/domain/entities/Lesson";
import { LessonRepository } from "@/domain/repositories/LessonRepository";
import { lessonApi } from "../api/lesson-api";

export class LessonRepositoryImpl implements LessonRepository {
  async save(lesson: CreateLessonDto): Promise<Lesson> {
    return lessonApi.save(lesson);
  }

  async getLessonByStableId(stableId: string): Promise<Lesson[]> {
    return lessonApi.getLessonByStableId(stableId);
  }
}
