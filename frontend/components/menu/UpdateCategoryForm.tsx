"use client";

import { useState, useEffect } from "react";
import { useUpdateCategory, useCategories } from "@/hooks/useMenu";
import { useOwnerRestaurants } from "@/hooks/useRestaurants";
import { CategoryPayload } from "@/types/menuTypes";
import { useRouter } from "next/navigation";

interface Props {
    categoryId: number;
}

const UpdateCategoryForm = ({ categoryId }: Props) => {
    const router = useRouter();
    const [formData, setFormData] = useState<CategoryPayload>({
        restaurant: 0,
        name: "",
        description: "",
    });

    const { data: categories } = useCategories();
    const { data: restaurants, isLoading: restaurantsLoading } = useOwnerRestaurants();
    const { mutate, isPending, error } = useUpdateCategory(categoryId);

    const category = categories?.find(c => c.id === categoryId);

    useEffect(() => {
        if (category) {
            setFormData({
                restaurant: category.restaurant,
                name: category.name,
                description: category.description,
            });
        }
    }, [category]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "restaurant" ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.restaurant) {
            alert("Please fill in all required fields.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                router.push("/dashboard/owner/menu/categories");
            },
        });
    };

    if (restaurantsLoading || !category) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Update Category</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                <div>
                    <label className="block text-sm font-medium mb-1">Restaurant</label>
                    <select
                        name="restaurant"
                        value={formData.restaurant}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    >
                        <option value="">Select a restaurant</option>
                        {restaurants?.map(restaurant => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g., Appetizers, Main Course, Desserts"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe this category..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 h-24"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-70"
                    >
                        {isPending ? "Updating..." : "Update Category"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">
                        {(error as any)?.response?.data?.message || "Failed to update category"}
                    </p>
                )}
            </form>
        </div>
    );
};

export default UpdateCategoryForm;