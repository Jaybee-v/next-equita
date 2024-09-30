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

  async getLessonById(id: string): Promise<Lesson> {
    const response = await fetch(`/api/lesson/by-id/${id}`);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async getLessonByStableId(stableId: string): Promise<Lesson[]> {
    const response = await fetch(`/api/lesson/stable/${stableId}`);
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async findByTeacher(teacherId: string): Promise<Lesson[]> {
    const response = await fetch(`/api/lesson/teacher/${teacherId}`);
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async getLessonsByDate(date: string): Promise<Lesson[]> {
    const response = await fetch(`/api/lesson/date/${date}`);
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
    console.log(data);

    throw new Error(data.error);
  },

  async updateLesson(id: string, lesson: CreateLessonDto): Promise<Lesson> {
    const response = await fetch(`/api/lesson/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(lesson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async deleteLesson(id: string): Promise<void> {
    const deletedLesson = await fetch(`/api/lesson/delete/${id}`, {
      method: "DELETE",
    });
    const data = await deletedLesson.json();

    if (deletedLesson.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },
};
