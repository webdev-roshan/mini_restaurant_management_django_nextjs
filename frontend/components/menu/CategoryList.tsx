"use client";

import { useCategories, useDeleteCategory } from "@/hooks/useMenu";
import { Edit, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoryList = () => {
    const { data: categories, isLoading, error } = useCategories();
    const deleteMutation = useDeleteCategory();
    const router = useRouter();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this category? This will also delete all items in this category.")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p className="text-red-500">Error loading categories.</p>;
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No categories found.</p>
                <button
                    onClick={() => router.push("/dashboard/owner/menu/categories/create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Create First Category
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Menu Categories</h2>
                <button
                    onClick={() => router.push("/dashboard/owner/menu/categories/create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                    <div key={category.id} className="border rounded-lg p-4 shadow-md relative">
                        <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                        <p className="text-gray-600 mb-2">{category.description}</p>
                        <p className="text-sm text-gray-500">
                            Items: {category.menu_items?.length || 0}
                        </p>
                        
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => router.push(`/dashboard/owner/menu/categories/update/${category.id}`)}
                                className="p-1 bg-yellow-200 rounded hover:bg-yellow-300"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="p-1 bg-red-200 rounded hover:bg-red-300"
                                disabled={deleteMutation.isPending}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="mt-4 pt-2 border-t">
                            <button
                                onClick={() => router.push(`/dashboard/owner/menu/items?category=${category.id}`)}
                                className="text-blue-500 hover:text-blue-700 text-sm"
                            >
                                View Items →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;