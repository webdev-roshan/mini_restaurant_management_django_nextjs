"use client";

import CategoryList from '@/components/menu/CategoryList';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChefHat } from 'lucide-react';

const CustomerMenuPage = () => {
    const params = useParams();
    const router = useRouter();
    const restaurant_id = Number(params.restaurant_id);

    return (
        <ProtectedRoute allowedTypes={["customer"]}>
            <div className="space-y-6 fade-in">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => router.push("/dashboard/customer")}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Restaurants
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <ChefHat className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Restaurant Menu</h1>
                            <p className="text-gray-600">Browse and order from our delicious menu</p>
                        </div>
                    </div>
                </div>

                {/* Menu Categories */}
                <CategoryList restaurant_id={restaurant_id} onlyOwner={false} />
            </div>
        </ProtectedRoute>
    );
};

export default CustomerMenuPage;