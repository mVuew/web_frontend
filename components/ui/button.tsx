import React from "react";
import colors from "../../constants/colors";

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
  };

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles =
    `
    inline-flex items-center justify-center
    font-medium tracking-wide
    transition-all duration-300

    focus:outline-none
    focus:ring-2
    focus:ring-[var(--color-accent)]/30

    disabled:opacity-50
    disabled:pointer-events-none
    `;

  const sizes = {
    sm: `
      px-4 py-2
      text-sm
      rounded-none
    `,

    md: `
      px-5 py-2.5
      text-sm
      rounded-none
    `,

    lg: `
      px-8 py-4
      text-base
      rounded-none
    `,
  };

  const variants = {
    /* Primary editorial button */
    primary: `
      bg-surface
      text-foreground
      border border-border

      hover:bg-accent-soft
      hover:-translate-y-[1px]
      hover:shadow-lg
    `,

    /* Filled accent button */
    secondary: `
      text-white
      border border-transparent
      bg-[var(--color-accent)]

      hover:opacity-90
      hover:-translate-y-[1px]
      shadow-md
    `,

    /* Minimal outline button */
    outline: `
      bg-transparent
      text-foreground
      border border-border

      hover:bg-surface
      hover:border-[var(--color-accent)]
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
}