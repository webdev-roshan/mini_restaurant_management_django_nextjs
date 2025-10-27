"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import UpdateRestaurantForm from "@/components/restaurants/UpdateRestaurantForm";
import { useRouter, useParams } from "next/navigation";
import { useOwnerRestaurants } from "@/hooks/useRestaurants";

const UpdateRestaurantPage = () => {
    const router = useRouter();
    const params = useParams();
    const restaurantId = Number(params?.id);

    const { data: restaurants, isLoading } = useOwnerRestaurants();
    const restaurant = restaurants?.find(r => r.id === restaurantId);

    if (isLoading) return <p>Loading...</p>;
    if (!restaurant) return <p>Restaurant not found.</p>;

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <UpdateRestaurantForm restaurant={restaurant} onSuccess={() => router.push("/dashboard/owner/restaurants/")} />
        </ProtectedRoute>
    );
};

export default UpdateRestaurantPage;
