"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import MenuNavigation from "@/components/menu/MenuNavigation";
import { useRouter } from "next/navigation";

const MenuDashboard = () => {
    const router = useRouter();

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <MenuNavigation />
                <h1 className="text-2xl font-bold">Menu Management</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <p className="text-gray-600 mb-4">
                            Organize your menu items into categories like appetizers, main courses, desserts, etc.
                        </p>
                        <div className="space-y-2">
                            <button
                                onClick={() => router.push("/dashboard/owner/menu/categories")}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Manage Categories
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/owner/menu/categories/create")}
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Create New Category
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
                        <p className="text-gray-600 mb-4">
                            Add and manage individual menu items with prices, descriptions, and images.
                        </p>
                        <div className="space-y-2">
                            <button
                                onClick={() => router.push("/dashboard/owner/menu/items")}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Manage Items
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/owner/menu/items/create")}
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Create New Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default MenuDashboard;