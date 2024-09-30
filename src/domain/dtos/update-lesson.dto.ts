export interface UpdateLessonDto {
  title: string;
  description?: string;
  type: string;
  date: Date;
  start: string;
  end: string;
  isPublic: boolean;
  emptyPlaces: number;
  requiredLevel: number;
}
