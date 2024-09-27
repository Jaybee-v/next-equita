import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonsForRiderUseCase {
  constructor(private lessonRepository: LessonRepository) {}

  execute(riderId: string) {
    return this.lessonRepository.getLessonsForRider(riderId);
  }
}
