"use client";

import { useAllRestaurants, useOwnerRestaurants, useDeleteRestaurant } from "@/hooks/useRestaurants";
import { Edit, Trash2, MapPin, Plus, Building2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface Props {
    onlyOwner?: boolean;
}

const RestaurantList = ({ onlyOwner = false }: Props) => {
    const { data: restaurants, isLoading, error } = onlyOwner
        ? useOwnerRestaurants()
        : useAllRestaurants();

    const { data: user } = useUser();
    const router = useRouter();
    const deleteMutation = useDeleteRestaurant();

    const handleUpdate = (id: number) => {
        router.push(`/dashboard/owner/restaurants/update/${id}`);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this restaurant?")) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    router.refresh();
                },
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading restaurants...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error loading restaurants. Please try again.</p>
            </div>
        );
    }

    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No restaurants found</h3>
                <p className="text-gray-600 mb-6">Get started by creating your first restaurant.</p>
                {onlyOwner && (
                    <button
                        onClick={() => router.push("/dashboard/owner/restaurants/create")}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Restaurant
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6 fade-in">
            {onlyOwner && (
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">My Restaurants</h2>
                        <p className="text-gray-600">Manage your restaurant listings</p>
                    </div>
                    <button
                        onClick={() => router.push("/dashboard/owner/restaurants/create")}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Restaurant
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                        <div className="relative">
                            {restaurant.image ? (
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <Building2 className="w-12 h-12 text-gray-400" />
                                </div>
                            )}

                            {user?.user_type === "owner" && (
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleUpdate(restaurant.id)}
                                        className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                        title="Edit restaurant"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(restaurant.id)}
                                        className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                        disabled={deleteMutation.isPending}
                                        title="Delete restaurant"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                                {restaurant.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                {restaurant.description}
                            </p>

                            {restaurant.address && (
                                <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4 mr-1 shrink-0" />
                                    <span className="overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{restaurant.address}</span>
                                </div>
                            )}
                            {
                                user?.user_type === "owner" && (
                                    <button 
                                        className="text-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer mt-3 w-full" 
                                        onClick={() => router.push(`/dashboard/owner/restaurants/${restaurant.id}/menu`)}
                                    >
                                        Manage Menu
                                    </button>
                                )
                            }
                            {
                                user?.user_type === "customer" && (
                                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer mt-3" onClick={() => router.push(`/dashboard/customer/${restaurant.id}/menu`)}>View Menu</button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;