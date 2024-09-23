import { User } from "@/domain/entities/User";
import React from "react";

interface StableOrTeacherSearchCardProps {
  user: User;
}

export const StableOrTeacherSearchCard = ({
  user,
}: StableOrTeacherSearchCardProps) => {
  return <div>{user.name}</div>;
};
