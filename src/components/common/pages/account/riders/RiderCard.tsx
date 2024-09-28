import { Rider } from "@/domain/entities/Rider";
import React from "react";

interface RiderCardProps {
  rider: Rider;
}

export const RiderCard = ({ rider }: RiderCardProps) => {
  return (
    <article className="absolute right-6 ">
      <div className="max-w-md mx-auto bg-card p-6 rounded drop-shadow-md">
        <h2 className="text-2xl font-bold text-center">Fiche cavalier</h2>
        <h3 className="text-xl font-bold">
          {rider.name} {rider.lastname}
        </h3>
        <p>
          <span className="font-bold">Niveau:</span>{" "}
          {rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}
        </p>

        <p>
          <span className="font-bold">@</span> {rider.email}
        </p>
      </div>
    </article>
  );
};
