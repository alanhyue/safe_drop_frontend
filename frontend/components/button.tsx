import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "normal" | "text";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  href = "",
  variant = "normal",
  disabled = false,
}: ButtonProps) {
  const router = useRouter()
  const baseStyles =
    "rounded-md px-2 focus:outline-none transition-colors cursor-pointer";

  const variants = {
    normal:
      "bg-blue-600 text-white hover:bg-blue-700",
    text:
      "bg-transparent text-blue-600 hover:text-blue-700",
  };

  const disabledStyles = {
    normal:
      "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300",
    text:
      "text-gray-400 cursor-not-allowed hover:text-gray-400",
  };

  const appliedStyles = disabled
    ? disabledStyles[variant]
    : variants[variant];

  function handleClick() {
    onClick?.()
    if (href) router.push(href)
  }

  return (
    <button
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      className={`${baseStyles} ${appliedStyles} ${className}`}
    >
      {children}
    </button>
  );
}
