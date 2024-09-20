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
};
