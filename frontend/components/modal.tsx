"use client";

import { ReactNode, useState } from "react";
import Button from "@/components/button";

interface ModalProps {
    open: boolean;
    setOpen: (boolean) => void;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ open, setOpen, onClose, title, children }: ModalProps) {

    function handleClose() {
        setOpen(false)
        onClose?.()
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
            <div
                className="relative w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex items-center justify-between mb-4">
                    {title && (
                        <span className="text-lg font-medium text-gray-800">
                            {title}
                        </span>
                    )}
                    <Button
                        variant="text"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        ✕
                    </Button>
                </div>

                {/* Body */}
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    );
}
