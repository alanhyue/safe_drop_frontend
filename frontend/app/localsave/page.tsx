"use client";

import { useState } from "react";

export default function FilePickerPage() {
    const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileInfo({ name: file.name, size: file.size });
        } else {
            setFileInfo(null);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
            <h1 className="text-2xl font-semibold">Local File Picker Demo</h1>

            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Select a File
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {fileInfo && (
                <div className="p-4 border rounded-lg shadow text-center bg-gray-50">
                    <p><strong>File Name:</strong> {fileInfo.name}</p>
                    <p><strong>File Size:</strong> {(fileInfo.size / 1024).toFixed(2)} KB</p>
                </div>
            )}
        </main>
    );
}
