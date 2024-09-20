import { CreateLessonDto } from "@/domain/dtos/create-lesson.dto";
import { Lesson } from "@/domain/entities/Lesson";

export const lessonApi = {
  async save(lesson: CreateLessonDto): Promise<Lesson> {
    const createdLesson = await fetch("/api/lesson", {
      method: "POST",
      body: JSON.stringify(lesson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await createdLesson.json();

    if (createdLesson.status === 201) {
      return data;
    }
    throw new Error(data.error);
  },

  async getLessonByStableId(stableId: string): Promise<Lesson[]> {
    const response = await fetch(
      `http://localhost:3000/api/lesson/${stableId}`
    );
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },
};
