"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ForgetPasswordForm } from "../forms/ForgetPasswordForm";

export const DialogForgetPassword = () => {
  return (
    <Dialog>
      <DialogTrigger className="italic">
        J&apos;ai oublié mon mot de passe
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Réinitialiser votre mot de passe</DialogTitle>
          <DialogDescription>
            Entrez votre adresse email et nous vous enverrons un lien pour
            réinitialiser votre mot de passe
          </DialogDescription>
          <ForgetPasswordForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
