import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary";

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "border border-line bg-white text-ink hover:bg-paper",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Renders as a `<Link>` when given, otherwise a native `<button>`. */
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
  ...aria
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} {...aria}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled} {...aria}>
      {children}
    </button>
  );
}
