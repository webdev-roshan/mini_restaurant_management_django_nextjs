"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const is404Page = pathname === "/not-found";

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className={`flex-1 ${
                isHomePage || isAuthPage || is404Page 
                    ? "" 
                    : "p-6"
            }`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;