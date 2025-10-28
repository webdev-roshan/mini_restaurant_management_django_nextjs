"use client"

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Building2, Menu, Plus, FolderOpen, Utensils } from "lucide-react";

const OwnerDashboard = () => {
    const router = useRouter()

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-8 fade-in">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Owner Dashboard</h1>
                    <p className="text-gray-600">Manage your restaurants and menu items</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1  cursor-pointer">
                        <div className="px-6 py-4">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Restaurant Management</h2>
                                    <p className="text-gray-600 text-sm">Manage your restaurant listings</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push("/dashboard/owner/restaurants")}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Building2 className="w-4 h-4 mr-2" />
                                    View Restaurants
                                </button>
                                <button
                                    onClick={() => router.push("/dashboard/owner/restaurants/create")}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Restaurant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default OwnerDashboard;