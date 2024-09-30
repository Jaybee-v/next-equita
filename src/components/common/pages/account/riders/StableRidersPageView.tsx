"use client";
import { StableRidersTable } from "@/components/common/tables/StableRidersTable";
import { Rider } from "@/domain/entities/Rider";
import { Session } from "next-auth";
import React, { useState } from "react";
import { RiderCard } from "./RiderCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StableRidersPageViewProps {
  session: Session;
}

export const StableRidersPageView = ({
  session,
}: StableRidersPageViewProps) => {
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  return (
    <div className="relative py-6">
      <Card className="max-w-lg mx-auto ">
        <CardHeader>
          <CardTitle>Liste de vos cavaliers</CardTitle>
          <CardDescription>
            Sélectionnez un cavalier pour voir ses informations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StableRidersTable
            session={session}
            selectedRider={selectedRider}
            setSelectedRider={setSelectedRider}
          />
        </CardContent>
      </Card>
      {selectedRider && <RiderCard rider={selectedRider} />}
    </div>
  );
};
