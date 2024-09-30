"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Rider } from "@/domain/entities/Rider";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkRepositoryImpl } from "@/infrastructure/repositories/LinkRepositoryImpl";
import { AcceptLinkByStableUseCase } from "@/domain/use-cases/AcceptLinkByStable.usecase";
import { DeleteLinkUseCase } from "@/domain/use-cases/DeleteLink.usecase";

interface StableRidersTableRowProps {
  rider: Rider;
  riders: Rider[];
  setRiders: React.Dispatch<React.SetStateAction<Rider[]>>;
  selectedRider: Rider | null;
  setSelectedRider: (rider: Rider | null) => void;
}

export const StableRidersTableRow = ({
  rider,
  setRiders,
  riders,
  selectedRider,
  setSelectedRider,
}: StableRidersTableRowProps) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(rider.isAccepted);

  const onAccept = () => {
    const linkRepository = new LinkRepositoryImpl();
    const acceptLinkByStableUseCase = new AcceptLinkByStableUseCase(
      linkRepository
    );
    acceptLinkByStableUseCase.execute(rider.linkId, true);
    setIsAccepted(true);
  };

  const onRefuse = async () => {
    setIsAccepted(false);
    const linkRepository = new LinkRepositoryImpl();
    const deleteLinkUseCase = new DeleteLinkUseCase(linkRepository);
    await deleteLinkUseCase.execute(rider.linkId);
    const _riders = [...riders];
    const index = _riders.findIndex((r) => r.linkId === rider.linkId);
    _riders.splice(index, 1);
    setRiders(_riders);
  };

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => {
        if (selectedRider === rider) setSelectedRider(null);
        else setSelectedRider(rider);
      }}
    >
      <TableCell>
        {rider.name} {rider.lastname}
      </TableCell>

      <TableCell className="">
        {rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}
      </TableCell>
      <TableCell className="text-right">
        {isAccepted ? (
          <span className="bg-green-600 font-bold px-2 py-1 rounded-2xl shadow-md">
            Accepté
          </span>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger>
              {" "}
              <span className="bg-orange-300 w-full font-bold px-2 py-1 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-orange-200 cursor-pointer">
                En attente
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {rider.lastname} {rider.name} est il un de vos cavaliers ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Vous pouvez accepter ou refuser ce cavalier.
                  <br />
                  Si vous acceptez ce cavalier, il pourra accéder à vos leçons.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>

                <AlertDialogAction
                  onClick={onRefuse}
                  className="bg-red-600 hover:bg-red-500"
                >
                  Refuser
                </AlertDialogAction>
                <AlertDialogAction
                  className="bg-green-600 hover:bg-green-500"
                  onClick={onAccept}
                >
                  Accepter
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </TableCell>
    </TableRow>
  );
};
