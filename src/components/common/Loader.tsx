"use client";
import { ArrowLeftCircleIcon, HomeIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export const Loader = () => {
  const router = useRouter();
  return (
    <div className="w-full min-h-[80vh] flex flex-col gap-6 justify-center items-center">
      <Loader2Icon size={90} className="animate-spin" color="gray" />
      <div className="flex gap-8">
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => router.back()}
        >
          <ArrowLeftCircleIcon />
          <span className="ms-4">Retour</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          <HomeIcon />
          <span className="ms-4">Accueil</span>
        </Button>
      </div>
    </div>
  );
};
