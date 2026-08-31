import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-md border border-line bg-white/60 p-4 ${className}`}
      {...props}
    />
  );
}
