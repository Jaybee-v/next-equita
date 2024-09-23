"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { LessonForm } from "../../forms/LessonForm";
import { Session } from "next-auth";

interface AddLessonButtonProps {
  session: Session;
}

export const AddLessonButton = ({ session }: AddLessonButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-4 border-green-600 border-2 bg-green-100 font-semibold text-green-600"
        >
          Ajouter une leçon
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Créer une leçon</DialogTitle>
        </DialogHeader>
        <LessonForm session={session} />
      </DialogContent>
    </Dialog>
  );
};
