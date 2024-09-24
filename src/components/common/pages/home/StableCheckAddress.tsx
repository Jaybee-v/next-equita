"use client";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "../../forms/AddressForm";

interface StableCheckAddressProps {
  session: Session;
}

export const StableCheckAddress = ({ session }: StableCheckAddressProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddress = async () => {
      const checkAddress = await new UserRepositoryImpl().getUserById(
        session.user.id
      );

      if (checkAddress.address) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    fetchAddress();
  }, [session.user.id]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <AddressForm session={session} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
