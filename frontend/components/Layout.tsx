"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default Layout;
