import { Rider } from "@/domain/entities/Rider";
import React from "react";

interface RiderCardProps {
  rider: Rider;
}

export const RiderCard = ({ rider }: RiderCardProps) => {
  return (
    <article className="absolute top-0 right-0 bg-gray-900 flex justify-center items-center p-6 min-h-[92vh] bg-opacity-20 shadow-2xl">
      <div className="max-w-md mx-auto bg-card p-6 rounded drop-shadow-md h-fit">
        <h2 className="text-2xl font-bold text-center">Fiche cavalier</h2>
        <h3 className="text-xl font-semibold">
          {rider.name} {rider.lastname}
        </h3>
        <div className="flex justify-between">
          <h6 className="font-bold">Niveau</h6>
          <p>{rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}</p>
        </div>

        <div className="flex justify-between">
          <h6 className="font-bold">@</h6>
          <p>{rider.email}</p>
        </div>
      </div>
    </article>
  );
};
