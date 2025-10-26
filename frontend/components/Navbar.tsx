"use client";

import React from "react";
import Link from "next/link";
import { User, LogOut, Home } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
    const { data: user, isLoading } = useUser();
    const { mutate: logout } = useLogout();

    return (
        <nav className="bg-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Home className="text-blue-600" />
                    <span className="font-bold text-lg text-gray-700">MiniRestaurant</span>
                </Link>

                <div className="flex items-center space-x-4">
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : user ? (
                        <>
                            <span className="flex items-center space-x-1 text-gray-700 font-medium">
                                <User className="w-4 h-4" />
                                <span>{user.fullname}</span>
                            </span>
                            <button
                                onClick={() => logout()}
                                className="flex items-center space-x-1 text-red-500 hover:text-red-700 font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
