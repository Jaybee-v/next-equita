"use client";

import { User } from "@/domain/entities/User";
import React, { useState } from "react";
import { SearchStableOrTeacherForm } from "../forms/SearchStableOrTeacherForm";
import { StableOrTeacherSearchCard } from "./StableOrTeacherSearchCard";

export const SearchStableTeacherComponent = () => {
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
        <SearchStableOrTeacherForm
          setTargets={setTargets}
          setError={setError}
        />
        {error && <p>{error}</p>}
        <div>
          {targets.map((target) => (
            <StableOrTeacherSearchCard key={target.id} user={target} />
          ))}
        </div>
      </div>
    </main>
  );
};
