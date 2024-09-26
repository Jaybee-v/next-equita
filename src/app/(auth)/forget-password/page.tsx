import { ReinitPasswordForm } from "@/components/common/forms/ReinitPasswordForm";
import React from "react";

export default function ForgetPasswordPage() {
  return (
    <main className="max-w-6xl mx-auto py-6">
      <div className="max-w-lg mx-auto bg-card p-6 lg:rounded lg:drop-shadow-md">
        <ReinitPasswordForm />
      </div>
    </main>
  );
}
