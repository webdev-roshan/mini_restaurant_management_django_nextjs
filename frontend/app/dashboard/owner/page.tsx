"use client"

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { useRouter } from "next/navigation";

const OwnerDashboard = () => {
    const router = useRouter()

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Owner Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Restaurant Management</h2>
                        <div className="space-y-2">
                            <button 
                                onClick={() => router.push("/dashboard/owner/restaurants")} 
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Restaurant List
                            </button>
                            <button 
                                onClick={() => router.push("/dashboard/owner/restaurants/create")} 
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Create Restaurant
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Menu Management</h2>
                        <div className="space-y-2">
                            <button 
                                onClick={() => router.push("/dashboard/owner/menu")} 
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Manage Menu
                            </button>
                            <button 
                                onClick={() => router.push("/dashboard/owner/menu/categories")} 
                                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                            >
                                Categories
                            </button>
                            <button 
                                onClick={() => router.push("/dashboard/owner/menu/items")} 
                                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                            >
                                Menu Items
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default OwnerDashboard;
