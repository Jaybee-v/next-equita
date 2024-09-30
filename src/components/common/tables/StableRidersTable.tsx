"use client";
import { GetStableLinksUseCase } from "@/domain/use-cases/GetStableLinks.usecase";
import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Rider } from "@/domain/entities/Rider";
import { StableRidersTableRow } from "./StableRidersTableRow";
import { GetTeacherLinksUseCase } from "@/domain/use-cases/GetTeacherLinks.usecase";
import { Loader } from "../Loader";

interface StableRidersTableProps {
  session: Session;
  selectedRider: Rider | null;
  setSelectedRider: (rider: Rider | null) => void;
}

export const StableRidersTable = ({
  session,
  selectedRider,
  setSelectedRider,
}: StableRidersTableProps) => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRiders = async () => {
      const linkRepository = new LinkRepositoryImpl();
      if (session.user.role === "stable") {
        const getStableLinksUseCase = new GetStableLinksUseCase(linkRepository);
        const results = await getStableLinksUseCase.execute(session.user.id);
        setRiders(results);
        setIsLoading(false);
      }
      if (session.user.role === "teacher") {
        const getTeacherLinkUseCase = new GetTeacherLinksUseCase(
          linkRepository
        );
        const results = await getTeacherLinkUseCase.execute(session.user.id);
        setRiders(results);
        setIsLoading(false);
      }
    };
    fetchRiders();
  }, [session]);

  if (isLoading) return <Loader />;

  if (riders.length === 0) {
    return (
      <div className="text-center">
        Vous n'avez pas encore de cavaliers dans votre écurie
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Nom - Prénom</TableHead>
          <TableHead className="">Niveau</TableHead>
          <TableHead className="text-right">Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {riders.map((rider) => (
          <StableRidersTableRow
            key={rider.id}
            rider={rider}
            setRiders={setRiders}
            riders={riders}
            selectedRider={selectedRider}
            setSelectedRider={setSelectedRider}
          />
        ))}
      </TableBody>
    </Table>
  );
};
