"use client";

import { useState, useEffect } from "react";
import { useUpdateCategory, useCategories } from "@/hooks/useMenu";
import { CategoryPayload } from "@/types/menuTypes";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
    categoryId: number;
}

const UpdateCategoryForm = ({ categoryId }: Props) => {
    const router = useRouter();
    const params = useParams();
    const restaurantId = parseInt(params.restaurant_id as string);
    
    const [formData, setFormData] = useState<CategoryPayload>({
        restaurant: restaurantId,
        name: "",
        description: "",
    });

    const { data: categories } = useCategories();
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description) {
            alert("Please fill in all required fields.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories`);
            },
        });
    };

    if (!category) return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading category...</span>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer border border-gray-300"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Update Category</h1>
                    <p className="text-gray-600">Edit category information</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Restaurant ID:</strong> {restaurantId}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                This category belongs to the selected restaurant
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g., Appetizers, Main Course, Desserts"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe this category and what types of items it contains..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 resize-none hover:border-gray-400 h-24"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer border border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                {isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-white"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Category"
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm">
                                    {(error as any)?.response?.data?.message || "Failed to update category"}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryForm;