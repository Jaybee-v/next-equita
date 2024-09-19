"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

interface RouterButtonProps {
  type: "back" | "default";
  label: string;
  href?: string;
}

export const RouterButton = ({ type, label, href }: RouterButtonProps) => {
  const router = useRouter();
  if (type === "back")
    return (
      <Button variant={"ghost"} type="button" onClick={() => router.back()}>
        {label}
      </Button>
    );

  if (type === "default" && href)
    return (
      <Button
        variant={"ghost"}
        type="button"
        onClick={() => router.push(href)}
        className="w-full"
      >
        {label}
      </Button>
    );
};
