"use client";
import { StableRidersTable } from "@/components/common/tables/StableRidersTable";
import { Rider } from "@/domain/entities/Rider";
import { Session } from "next-auth";
import React, { useState } from "react";
import { RiderCard } from "./RiderCard";

interface StableRidersPageViewProps {
  session: Session;
}

export const StableRidersPageView = ({
  session,
}: StableRidersPageViewProps) => {
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  return (
    <div className="relative py-6">
      <article className="max-w-lg mx-auto bg-card p-6 rounded drop-shadow-md py-6">
        <StableRidersTable
          session={session}
          selectedRider={selectedRider}
          setSelectedRider={setSelectedRider}
        />
      </article>
      {selectedRider && <RiderCard rider={selectedRider} />}
    </div>
  );
};
