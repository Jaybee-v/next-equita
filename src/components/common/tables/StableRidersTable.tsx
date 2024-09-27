"use client";
import { User } from "@/domain/entities/User";
import { GetStableLinksUseCase } from "@/domain/use-cases/GetStableLinks.usecase";
import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StableRidersTableProps {
  session: Session;
}

export const StableRidersTable = ({ session }: StableRidersTableProps) => {
  const [riders, setRiders] = useState<User[]>([]);

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
          <TableHead className="text-right">Niveau</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {riders.map((rider) => (
          <TableRow key={rider.id}>
            <TableCell>
              {rider.name} {rider.lastname}
            </TableCell>

            <TableCell className="text-right">
              {rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
