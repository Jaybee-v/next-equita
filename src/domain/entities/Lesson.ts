export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: string;
  date: Date;
  start: string;
  end: string;
  isPublic: boolean;
  emptyPlaces: number;
  stableId: string;
  requiredLevel: number;
  createdAt: Date;
  updatedAt: Date;
}
