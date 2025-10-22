"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import FileUpload from "@/components/file-upload";
import ItemSelector from "@/components/item-selector";
import Button from "@/components/button";
import Banner from "@/components/banner";
import Modal from "@/components/modal";
import api from "@/lib/api";
import { useState } from "react";
import Link from "next/link";

export default function ReadPage() {
    const { user, updateUserInfo } = useContext(UserContext);
    const [extractID, setExtractID] = useState(null)
    const [files, setFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
    const [error, setError] = useState(""); // error message
    const [hasEnoughBalance, setHasEnoughBalance] = useState(true)

    const handleFileUpload = async (file, data) => {
        setExtractID(data.extract_id)
        setFiles(data.files)
    };

    function confirmDownloadFiles() {
        setConfirmationModalOpen(true)
    }

    async function handleDownloadFiles() {
        const query = new URLSearchParams();
        query.append("extract_id", extractID);
        selectedFiles.forEach(f => query.append("filenames", f.filename));

        // Authenticated API call
        let response;
        try {
            response = await api.get(`/download?${query.toString()}`, {
                responseType: "blob", // important for binary data
            });
        } catch (err) {
            if (err.response?.status == 401) {
                setError("字节余额不足")
            }
            setHasEnoughBalance(false)
            return; // exit early
        }

        // Extract filename from headers if backend sends it (optional)
        const contentDisposition = response.headers["content-disposition"];
        let filename = "files.zip";
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) filename = match[1];
        }

        // Create a blob link and trigger download
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);

        setConfirmationModalOpen(false);

        // get updated user balance
        updateUserInfo()
    }

    const handleSelectedChange = (selected) => {
        setSelectedFiles(selected)
    };

    const promptForPicture = (
        <div className="w-full">
            <h1 className="text-2xl font-semibold text-center mb-6">
                选择用安放生成的图片
            </h1>
            <FileUpload
                accept=".png"
                maxSizeMB={100}
                targetUrl={`/extract`}
                onFileSelect={handleFileUpload}
            />
        </div>
    )

    const totalBytes = selectedFiles.reduce((sum, item) => sum + item.size, 0)
    useEffect(() => {
        setError(null) // clearn backend error
        setHasEnoughBalance(totalBytes < user?.balance)
    }, [selectedFiles])

    const presentResult = (
        <div className="flex flex-col gap-2">
            <ItemSelector
                items={files}
                onChange={handleSelectedChange}
                itemKey={file => file.filename}
                renderItem={(file, isSelected) => (
                    <div className="flex justify-between items-center w-full">
                        <span className={isSelected ? "" : ""}>{file.filename}</span>
                        <span className="text-gray-400 text-sm">{file.size} 字节</span>
                    </div>
                )}
            />
            <div className="flex gap-2">
                <Button
                    disabled={selectedFiles.length === 0}
                    onClick={confirmDownloadFiles}
                >
                    下载选中文件
                </Button>
                <span>已选中 {selectedFiles.length} 个文件，总计 {totalBytes} 个字节</span>
            </div>
            <Modal open={confirmationModalOpen} setOpen={setConfirmationModalOpen} title="确认下载">
                <div className="flex flex-col gap-2">
                    <span>
                        即将下载以下文件，共计消耗 {totalBytes} 字节余额。
                    </span>
                    <div>
                        {selectedFiles.map(file => {
                            return (
                                <div key={file.filename} className="flex justify-between items-center w-full">
                                    <span>{file.filename}</span>
                                    <span className="text-gray-400 text-sm">{file.size} 字节</span>
                                </div>
                            )
                        })}
                    </div>
                    {error && (
                        <Banner variant="error">{error}</Banner>
                    )}
                    <Button disabled={!hasEnoughBalance} onClick={handleDownloadFiles}>下载 {!hasEnoughBalance && " (字节余额不足)"}</Button>
                    {!hasEnoughBalance && (
                        <div className="text-sm">
                            <p>当前字节余额：{user?.balance}</p>
                            <p>请减少下载文件数 或 <Link href="/mall" target="_blank">购买更多字节</Link></p>
                        </div>
                    )}
                </div>

            </Modal>
        </div>
    )

    return (
        <main className="w-full p-16">
            {extractID !== null ? presentResult : promptForPicture
            }
        </main>
    );
}
