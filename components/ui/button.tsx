import React from "react";
import colors from "../../constants/colors";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-md",
  };

  const variants = {
    primary: `
      ${colors.primary}
      ${colors.primaryHover}
      shadow-md hover:shadow-red-700/20
    `,

    secondary: `
      bg-zinc-900 text-white border border-zinc-800
      hover:bg-zinc-800 hover:border-zinc-700
    `,

    outline: `
      border border-red-700/40 text-red-400
      hover:bg-red-700/10 hover:border-red-500
    `,
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}