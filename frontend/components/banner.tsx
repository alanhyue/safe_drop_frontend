import { ReactNode } from "react";

interface BannerProps {
    children: ReactNode;
    variant?: "error" | "info";
    className?: string;
}

export default function Banner({
    children,
    variant = "info",
    className = "",
}: BannerProps) {
    const variants = {
        error: "bg-red-50 border-red-200 text-red-700",
        info: "bg-blue-50 border-blue-200 text-blue-700",
    };

    return (
        <div
            className={`my-2 text-sm border rounded-md px-3 py-2 ${variants[variant]} ${className}`}
            role={variant === "error" ? "alert" : "status"}
        >
            {children}
        </div>
    );
}
