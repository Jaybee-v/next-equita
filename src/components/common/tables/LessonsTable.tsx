import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lesson } from "@/domain/entities/Lesson";

interface LessonsTableProps {
  lessons: Lesson[];
}

export const LessonsTable = ({ lessons }: LessonsTableProps) => {
  return (
    <Table className="border rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Titre</TableHead>
          <TableHead>Discipline</TableHead>
          <TableHead>Date / Horaire</TableHead>
          <TableHead className="text-right">Places restantes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson) => (
          <TableRow key={"lesson_" + lesson.id}>
            <TableCell className="font-medium">{lesson.title}</TableCell>
            <TableCell>{lesson.type}</TableCell>
            <TableCell>
              <article>
                <p>
                  {new Date(lesson.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  {lesson.start} - {lesson.end}
                </p>
              </article>
            </TableCell>
            <TableCell className="text-right">{lesson.emptyPlaces}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
