import Image from "next/image";
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <Image
      src="/images/logo.webp"
      alt="Equita-planner"
      width={size === "small" ? 50 : size === "medium" ? 80 : 100}
      height={200}
      className="rounded-full"
    />
  );
};
