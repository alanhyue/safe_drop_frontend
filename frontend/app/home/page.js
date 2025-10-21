"use client";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Welcome banner */}
            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">
                    欢迎, {user?.username || "用户"}!
                </h1>
                <div className="flex gap-2 items-center">
                    <span className="text-gray-600">
                        字节余额：{user?.balance}
                    </span>
                    <Button onClick={() => router.push("/mall")}>添加</Button>
                </div>
            </div>

            {/* Action cards */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <h2 className="font-semibold text-xl mb-2">我的资料</h2>
                    <p className="text-gray-600 text-sm">
                        查看或编辑你的个人信息
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <h2 className="font-semibold text-xl mb-2">账户设置</h2>
                    <p className="text-gray-600 text-sm">
                        修改密码或其他账户设置
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <h2 className="font-semibold text-xl mb-2">我的活动</h2>
                    <p className="text-gray-600 text-sm">
                        查看最近的操作记录
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <h2 className="font-semibold text-xl mb-2">登出</h2>
                    <p className="text-gray-600 text-sm">
                        安全退出账户
                    </p>
                </div>
            </div>
        </div>
    );
}
