"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/domain/entities/User";
import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface StableOrTeacherSearchCardProps {
  user: User;
  session: Session;
}

export const StableOrTeacherSearchCard = ({
  user,
  session,
}: StableOrTeacherSearchCardProps) => {
  const router = useRouter();
  const path = usePathname();
  const onSubmit = async () => {
    console.log("submit");
    console.log(session);
    const link = await new LinkRepositoryImpl().save({
      riderId: session.user.id,
      teacherId: user.role === "teacher" ? user.id : "",
      stableId: user.role === "stable" ? user.id : "",
    });
    console.log(link);
    if (path === "/") {
      router.push("/");
    }
    router.refresh();
  };

  return (
    <div className="border p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-default">
      <p className="flex justify-start text-xs bg-gray-200 w-fit px-4 py-1 rounded-full font-bold mb-4">
        {user.role === "stable" ? "Centre équestre" : "Moniteur"}
      </p>
      <section className="flex flex-col justify-center items-center gap-2 ">
        <h3 className="font-bold text-xl">
          {user.name} {user.lastname ? <span>{user.lastname}</span> : null}
        </h3>
        <Button type="button" onClick={onSubmit}>
          {user.role === "stable"
            ? "Devenir membre du centre équestre"
            : "Devenir client de ce moniteur"}
        </Button>
      </section>
    </div>
  );
};
