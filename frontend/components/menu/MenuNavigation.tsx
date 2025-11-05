"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { useOwnerRestaurants } from "@/hooks/useRestaurants";

const MenuNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const restaurantId = params.restaurant_id as string;

    const { data: restaurants } = useOwnerRestaurants();
    const restaurant = restaurants?.find(r => r.id === parseInt(restaurantId));

    const navItems = [
        { label: "Menu Overview", path: `/dashboard/owner/restaurants/${restaurantId}/menu` },
        { label: "Categories", path: `/dashboard/owner/restaurants/${restaurantId}/menu/categories` },
    ];

    return (
        <div className="space-y-4 mb-6">
            {/* Back to Restaurants Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/dashboard/owner/restaurants")}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Restaurants
                </button>
                
                {/* Restaurant Info */}
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded">
                        <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            {restaurant?.name || 'Loading...'}
                        </p>
                        <p className="text-xs text-gray-500">Restaurant Menu</p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                    pathname === item.path
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MenuNavigation;