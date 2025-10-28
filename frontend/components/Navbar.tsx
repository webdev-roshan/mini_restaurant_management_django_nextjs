"use client";

import React from "react";
import Link from "next/link";
import { User, LogOut, Home, ChefHat, Settings, Menu, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const { data: user, isLoading } = useUser();
    const { mutate: logout } = useLogout();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleDashboardClick = () => {
        if (user?.user_type === "owner") {
            router.push("/dashboard/owner");
        } else if (user?.user_type === "customer") {
            router.push("/dashboard/customer");
        } else if (user?.user_type === "admin") {
            router.push("/dashboard/admin");
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-linear-to-r from-blue-600 to-blue-700 p-2 rounded-lg group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-xl bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                MiniRestaurant
                            </span>
                            <p className="text-xs text-gray-500 -mt-1">Management System</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                                <span className="text-gray-500 text-sm">Loading...</span>
                            </div>
                        ) : user ? (
                            <>
                                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2 cursor-pointer" onClick={()=> router.push("/profile")}>
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-800">{user.fullname}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.user_type}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDashboardClick}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Dashboard
                                </button>

                                <button
                                    onClick={() => logout()}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                                <span className="ml-2 text-gray-500 text-sm">Loading...</span>
                            </div>
                        ) : user ? (
                            <>
                                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 mx-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.fullname}</p>
                                        <p className="text-sm text-gray-500 capitalize">{user.user_type}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDashboardClick}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 mx-2"
                                >
                                    <Settings className="w-4 h-4 mr-3 inline" />
                                    Dashboard
                                </button>

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 mx-2"
                                >
                                    <LogOut className="w-4 h-4 mr-3 inline" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 mx-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 mx-2 text-center"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;