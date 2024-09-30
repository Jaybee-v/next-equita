import { CreateLessonDto } from "../dtos/create-lesson.dto";
import { UpdateLessonDto } from "../dtos/update-lesson.dto";
import { Lesson } from "../entities/Lesson";

export interface LessonRepository {
  save(lesson: CreateLessonDto): Promise<Lesson>;
  getLessonById(id: string): Promise<Lesson>;
  getLessonByStableId(stableId: string): Promise<Lesson[]>;
  findByTeacher(teacherId: string): Promise<Lesson[]>;
  getLessonsByDate(date: string): Promise<Lesson[]>;
  getLessonsForRider(riderId: string): Promise<Lesson[]>;
  updateLesson(id: string, lesson: UpdateLessonDto): Promise<Lesson>;
  deleteLesson(id: string): Promise<void>;
}
