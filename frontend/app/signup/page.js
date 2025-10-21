"use client";

import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/app_config";
import Button from "@/components/button";
import errors from "@/lib/errors";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        if (!username || !password || !confirmPassword) {
            setMessage("请填写所有字段");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("两次输入的密码不一致");
            return;
        }

        try {
            await axios.post(`${API_URL}/auth/register`, null, {
                params: { username, password },
            });
            setMessage("注册成功！现在可以登录了。");
        } catch (err) {
            setMessage(
                errors[err.response?.data?.detail] || "注册过程中出现错误。"
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">注册账号</h1>

            <input
                type="text"
                placeholder="用户名"
                className="border p-2 mb-2 w-64 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="密码"
                className="border p-2 mb-2 w-64 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="确认密码"
                className="border p-2 mb-4 w-64 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
                onClick={handleSignup}
                className="w-64 py-1"
            >
                注册
            </Button>

            {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </div>
    );
}
