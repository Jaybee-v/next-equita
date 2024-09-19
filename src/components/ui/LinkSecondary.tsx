import Link from "next/link";
import React from "react";

interface LinkSecondaryProps {
  label: string;
  href: string;
}

export const LinkSecondary = ({ label, href }: LinkSecondaryProps) => {
  return (
    <Link
      href={href}
      className="w-full font-semibold tracking-wide h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-white shadow-sm hover:bg-accent hover:text-accent-foreground "
    >
      {label}
    </Link>
  );
};
