"use client";

import { useState, useRef, useEffect } from "react";
import { useUpdateRestaurant } from "@/hooks/useRestaurants";
import { UpdateRestaurantData, OwnerRestaurantResponse } from "@/types/restaurantTypes";
import { useRouter } from "next/navigation";

interface Props {
    restaurant: OwnerRestaurantResponse;
    onSuccess?: () => void;
}

const UpdateRestaurantForm = ({ restaurant, onSuccess }: Props) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<UpdateRestaurantData>({
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address || "",
        image: null,
    });

    const { mutate, isPending, error } = useUpdateRestaurant(restaurant.id);

    useEffect(() => {
        setFormData({
            name: restaurant.name,
            description: restaurant.description,
            address: restaurant.address || "",
            image: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [restaurant]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === "image" && files) {
            setFormData(prev => ({ ...prev, image: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description) {
            alert("Please fill in all required fields.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                if (fileInputRef.current) fileInputRef.current.value = "";
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg m-auto bg-white p-6 rounded-xl shadow-md">
            <input
                type="text"
                name="name"
                placeholder="Restaurant Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
            />
            <textarea
                name="description"
                placeholder="Restaurant Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address (optional)"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className="w-full"
            />
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-70"
            >
                {isPending ? "Updating..." : "Update Restaurant"}
            </button>
            {error && <p className="text-red-500 text-sm">{(error as any)?.response?.data?.message}</p>}
        </form>
    );
};

export default UpdateRestaurantForm;
