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

interface StableRidersTableProps {
  session: Session;
}

export const StableRidersTable = ({ session }: StableRidersTableProps) => {
  const [riders, setRiders] = useState<Rider[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const linkRepository = new LinkRepositoryImpl();
      const getStableLinksUseCase = new GetStableLinksUseCase(linkRepository);
      const results = await getStableLinksUseCase.execute(session.user.id);
      setRiders(results);
    };
    fetchRiders();
  }, [session]);
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
          />
        ))}
      </TableBody>
    </Table>
  );
};
