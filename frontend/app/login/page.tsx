"use client";

import { useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation"; // next/router is legacy in Next 13+
import Button from "@/components/button";


export default function LoginPage() {
    const { loginUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // error message
    const router = useRouter();

    const handleLogin = async () => {
        setError(""); // reset previous errors
        try {
            await loginUser(username, password);
            router.push("/home"); // redirect on success
        } catch (err: any) {
            // check for 401
            if (err.response?.status === 401) {
                setError("用户名或密码错误");
            } else {
                setError("登录失败，请稍后重试");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  p-4">
            <h1 className="text-2xl font-bold mb-4">登陆账号</h1>
            <div className="flex flex-col w-64 mx-auto space-y-2">
                <input
                    className="border p-2"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="密码"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                    className="w-64 py-1"
                    onClick={handleLogin}
                >
                    完成
                </Button>
            </div>
        </div>
    );
}
