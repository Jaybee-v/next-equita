import { CreateLessonDto } from "@/domain/dtos/create-lesson.dto";
import { Lesson } from "@/domain/entities/Lesson";
import { LessonRepository } from "@/domain/repositories/LessonRepository";
import { lessonApi } from "../api/lesson-api";
import { linkApi } from "../api/link-api";

export class LessonRepositoryImpl implements LessonRepository {
  async save(lesson: CreateLessonDto): Promise<Lesson> {
    return lessonApi.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    return lessonApi.getLessonById(id);
  }

  async getLessonByStableId(stableId: string): Promise<Lesson[]> {
    return lessonApi.getLessonByStableId(stableId);
  }

  async getLessonsByDate(date: string): Promise<Lesson[]> {
    return lessonApi.getLessonsByDate(date);
  }

  async getLessonsForRider(riderId: string): Promise<Lesson[]> {
    const links = await linkApi.getRiderLinks(riderId);
    const lessons: Lesson[] = [];
    for (const link of links) {
      if (link.stableId) {
        const getLessons = await lessonApi.getLessonByStableId(link.stableId);
        console.log(getLessons);
        lessons.push(...getLessons);
      }
    }

    return lessons;
  }

  async updateLesson(id: string, lesson: CreateLessonDto): Promise<Lesson> {
    return lessonApi.updateLesson(id, lesson);
  }

  async deleteLesson(id: string): Promise<void> {
    return lessonApi.deleteLesson(id);
  }
}
