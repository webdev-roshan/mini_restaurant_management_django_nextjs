"use client";

import { useAllRestaurants, useOwnerRestaurants, useDeleteRestaurant } from "@/hooks/useRestaurants";
import { OwnerRestaurantResponse, Restaurant } from "@/types/restaurantTypes";
import { Edit, Trash2 } from "lucide-react";
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error loading restaurants.</p>;
    if (!restaurants || restaurants.length === 0) return <p>No restaurants found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map(r => (
                <div key={r.id} className="border rounded-lg p-4 shadow-md relative">
                    {r.image && (
                        <img src={r.image} alt={r.name} className="w-full h-40 object-cover rounded-md mb-2" />
                    )}
                    <h3 className="font-bold text-lg">name: {r.name}</h3>
                    <p>description: {r.description}</p>
                    {r.address && <p className="text-gray-500 text-sm mt-1">address: {r.address}</p>}

                    {user?.user_type === "owner" && (
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button onClick={() => handleUpdate(r.id)} className="p-1 bg-yellow-200 rounded hover:bg-yellow-300">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(r.id)} className="p-1 bg-red-200 rounded hover:bg-red-300">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RestaurantList;
