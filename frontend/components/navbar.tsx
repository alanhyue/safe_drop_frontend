"use client";

import { Home, Send, FilePlus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import UserMenu from "@/components/user-menu";
import Button from "@/components/button";

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

    const navItems = (
        <>
            <NavItem icon={<Home className="text-blue-500" />} label="首页" href="/" />
            <NavItem icon={<Send className="" />} label="存文件" href="/save" />
            <NavItem icon={<FilePlus className="" />} label="取文件" href="/read" />
        </>
    );

    return (
        <header className="w-full bg-blue-50 border-b border-blue-100">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Left logo */}
                <div className="flex items-center space-x-2">
                    <Image src="/logo.jpg" alt="SafeDrop Logo" width={32} height={32} />
                    <span className="font-semibold text-blue-800 text-lg">安放</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-gray-700">
                    {navItems}
                </nav>

                {/* Right user/menu */}
                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="hidden md:block">
                            <UserMenu user={user} setUser={setUser} />
                        </div>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Button
                                href="/signup"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm font-medium"
                            >
                                注册
                            </Button>
                            <Button
                                href="/login"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm font-medium"
                            >
                                登陆
                            </Button>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden px-6 pb-4 space-y-3 bg-blue-50 border-t border-blue-100">
                    {navItems}
                    {user ? (
                        <UserMenu user={user} setUser={setUser} />
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Button
                                href="/signup"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm font-medium w-full"
                            >
                                注册
                            </Button>
                            <Button
                                href="/login"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm font-medium w-full"
                            >
                                登陆
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

function NavItem({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
}) {
    return (
        <Link href={href} className="flex items-center space-x-1 hover:text-blue-600">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

function Divider() {
    return <div className="w-px h-6 bg-gray-300 inline-block" />;
}
