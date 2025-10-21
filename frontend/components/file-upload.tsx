"use client";

import React, { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import api from "@/lib/api";
import errors from '@/lib/errors';

interface FileUploadProps {
    accept?: string; // e.g. "image/*" or ".png,.jpg"
    maxSizeMB?: number;
    targetUrl: string; // backend upload URL
    onFileSelect?: (file: File, response?: any) => void; // optional callback
}

export default function FileUpload({
    accept = "*",
    maxSizeMB = 5,
    targetUrl,
    onFileSelect,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = async (file: File) => {
        if (!targetUrl) {
            alert("No upload target URL specified.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post(targetUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = res.data;

            onFileSelect?.(file, data);
        } catch (err) {
            alert(errors[err.response?.data?.detail]);
        }
         finally {
            setUploading(false);
        }
    };

    const validateAndUpload = (file: File | undefined | null) => {
        if (!file) return;
        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`File too large. Max size is ${maxSizeMB} MB.`);
            return;
        }
        uploadFile(file);
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            validateAndUpload(e.dataTransfer.files?.[0]);
        },
        [maxSizeMB, targetUrl]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateAndUpload(e.target.files?.[0]);
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`flex flex-col w-full items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-colors ${isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
                } ${uploading ? "opacity-70 cursor-wait" : ""}`}
        >
            {uploading ? (
                <>
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                    <p className="text-gray-600">正在上传...</p>
                </>
            ) : (
                <>
                    <ImagePlus className="w-10 h-10 text-gray-500 mb-3" />
                    <p className="text-gray-700 font-medium">
                        拖拽文件至此 或{" "}
                        <span className="text-blue-600 underline">点击上传</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        {`支持类型: ${accept || "任意"}, 最大: ${maxSizeMB}MB`}
                    </p>
                </>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}
