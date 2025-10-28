"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import MenuNavigation from "@/components/menu/MenuNavigation";
import { useRouter, useParams } from "next/navigation";
import { useOwnerRestaurants } from "@/hooks/useRestaurants";
import { FolderOpen, Utensils, Plus, Building2 } from "lucide-react";

const OwnerMenuDashboard = () => {
    const router = useRouter();
    const params = useParams();
    const restaurantId = params.restaurant_id as string;
    
    const { data: restaurants, isLoading } = useOwnerRestaurants();
    const restaurant = restaurants?.find(r => r.id === parseInt(restaurantId));

    if (isLoading) {
        return (
            <ProtectedRoute allowedTypes={["owner"]}>
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading restaurant...</span>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6 fade-in">
                <MenuNavigation />
                
                {/* Restaurant Header */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {restaurant?.name || 'Restaurant'} Menu Management
                            </h1>
                            <p className="text-gray-600">
                                Organize and manage your restaurant's menu categories and items
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Management Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                    <FolderOpen className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                                    <p className="text-gray-600 text-sm">Organize menu sections</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">
                                Create and manage menu categories like appetizers, main courses, desserts, and beverages.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories`)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <FolderOpen className="w-4 h-4 mr-2" />
                                    Manage Categories
                                </button>
                                <button
                                    onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/create`)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Category
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                    <Utensils className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Menu Items</h2>
                                    <p className="text-gray-600 text-sm">Manage food & beverages</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">
                                Add and manage individual menu items with prices, descriptions, images, and dietary information.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/items`)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <Utensils className="w-4 h-4 mr-2" />
                                    Manage Items
                                </button>
                                <button
                                    onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/items/create`)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default OwnerMenuDashboard;