"use client";

import { useDeleteItem, useCategoryItems, useCategories } from "@/hooks/useMenu";
import { Edit, Trash2, Plus, Utensils, DollarSign, Tag, Leaf, Flame } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const ItemList = () => {
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.category_id);
    const restaurantId = Number(params.restaurant_id);

    const { data: items, isLoading, error } = useCategoryItems(categoryId);
    const { data: categories } = useCategories();
    const deleteMutation = useDeleteItem(categoryId);

    const getCategoryName = (categoryId: number) => {
        return categories?.find((c) => c.id === categoryId)?.name || "Unknown Category";
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading menu items...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error loading menu items. Please try again.</p>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Utensils className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No items in this category
                </h3>
                <p className="text-gray-600 mb-6">
                    This category doesn’t have any items yet.
                </p>
                <button
                    onClick={() =>
                        router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/${categoryId}/items/create`)
                    }
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Item
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Menu Items</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600">
                            Category: {getCategoryName(categoryId)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            router.push(`/dashboard/owner/restaurants/${restaurantId}/menu`)
                        }
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer border border-gray-300"
                    >
                        Back to Categories
                    </button>
                    <button
                        onClick={() =>
                            router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/${categoryId}/items/create`)
                        }
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <Plus size={18} className="mr-2" />
                        Add Item
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
                    >
                        <div className="relative">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-linear-to-br from-orange-100 to-red-100 flex items-center justify-center">
                                    <Utensils className="w-12 h-12 text-orange-400" />
                                </div>
                            )}

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() =>
                                        router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/${categoryId}/items/update/${item.id}`)
                                    }
                                    className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                    title="Edit item"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                    disabled={deleteMutation.isPending}
                                    title="Delete item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="absolute top-3 left-3">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.available
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {item.available ? "Available" : "Unavailable"}
                                </span>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-800 truncate">
                                    {item.name}
                                </h3>
                                <div className="flex items-center text-green-600 font-bold text-lg ml-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{item.price}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center text-gray-500 text-sm mb-3">
                                <Tag className="w-4 h-4 mr-1" />
                                <span>{getCategoryName(item.category)}</span>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.currency}
                                </span>
                                {item.is_vegetarian && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <Leaf className="w-3 h-3 mr-1" />
                                        Vegetarian
                                    </span>
                                )}
                                {item.is_spicy && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <Flame className="w-3 h-3 mr-1" />
                                        Spicy
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;