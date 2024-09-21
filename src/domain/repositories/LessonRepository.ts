import { CreateLessonDto } from "../dtos/create-lesson.dto";
import { Lesson } from "../entities/Lesson";

export interface LessonRepository {
  save(lesson: CreateLessonDto): Promise<Lesson>;
  getLessonByStableId(stableId: string): Promise<Lesson[]>;
  getLessonsByDate(date: string): Promise<Lesson[]>;
}
