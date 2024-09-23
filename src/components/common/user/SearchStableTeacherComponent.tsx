"use client";

import { User } from "@/domain/entities/User";
import React, { useState } from "react";
import { SearchStableOrTeacherForm } from "../forms/SearchStableOrTeacherForm";
import { StableOrTeacherSearchCard } from "./StableOrTeacherSearchCard";
import { Session } from "next-auth";

interface SearchStableTeacherComponentProps {
  session: Session;
}

export const SearchStableTeacherComponent = ({
  session,
}: SearchStableTeacherComponentProps) => {
  const [targets, setTargets] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-6xl mx-auto bg-card p-6 rounded drop-shadow-md">
      <h1 className="text-4xl font-bold tracking-wide drop-shadow-md">
        Bienvenue sur{" "}
        <span className="text-primary font-black">Equita-planner</span>
      </h1>
      <p>
        Pour commencer, vous devez rechercher et selectionner votre moniteur ou
        votre centre équestre avant de pouvoir réserver vos leçons
      </p>
      <div>
        <article className="max-w-lg mx-auto">
          <SearchStableOrTeacherForm
            setTargets={setTargets}
            setError={setError}
          />
        </article>
        {error && <p>{error}</p>}
        <div className="grid grid-cols-3 gap-2">
          {targets.map((target) => (
            <StableOrTeacherSearchCard
              key={target.id}
              user={target}
              session={session}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
