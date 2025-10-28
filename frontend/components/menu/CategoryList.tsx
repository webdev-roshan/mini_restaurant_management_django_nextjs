"use client";

import { useCategories, useDeleteCategory, useRestaurantCategory } from "@/hooks/useMenu";
import { Edit, Trash2, Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface Props {
    onlyOwner?: boolean;
    restaurant_id?: number;
}

const CategoryList = ({ onlyOwner = false, restaurant_id }: Props) => {
    const router = useRouter();
    const params = useParams();
    const restaurantId = params.restaurant_id as string || restaurant_id?.toString();

    const { data: categories, isLoading, error } = onlyOwner
        ? useCategories()
        : useRestaurantCategory(restaurant_id!);

    const deleteMutation = useDeleteCategory();

    const handleDelete = (id: number) => {
        if (
            confirm(
                "Are you sure you want to delete this category? This will also delete all items in this category."
            )
        ) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading categories...</span>
            </div>
        );

    if (error)
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error loading categories. Please try again.</p>
            </div>
        );

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No categories found.</p>
                {onlyOwner && restaurantId && (
                    <button
                        onClick={() =>
                            router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/create`)
                        }
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        Create First Category
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
                        <h2 className="text-xl font-bold text-gray-800">Menu Categories</h2>
                        <p className="text-gray-600">Organize your menu items into categories</p>
                    </div>
                    {restaurantId && (
                        <button
                            onClick={() =>
                                router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/create`)
                            }
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                        >
                            <Plus size={18} className="mr-2" />
                            Add Category
                        </button>
                    )}
                </div>
            )}

            {onlyOwner ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-gray-800 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                                        {category.name}
                                    </h3>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/update/${category.id}`)}
                                            className="inline-flex items-center justify-center p-2 text-xs font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                            title="Edit category"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="inline-flex items-center justify-center p-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                                            disabled={deleteMutation.isPending}
                                            title="Delete category"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                    {category.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {category.menu_items?.length || 0} items
                                    </div>
                                    <button
                                        onClick={() => router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/items?category=${category.id}`)}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer transition-colors"
                                    >
                                        View Items →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-10 space-x-4 overflow-x-auto pb-4">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className="min-w-[300px] bg-white rounded-xl shadow-lg border border-gray-100 shrink-0"
                        >
                            <div className="px-6 py-4">
                                <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                                {category.menu_items && category.menu_items.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                                        {category.menu_items.map(item => (
                                            <div
                                                key={item.id}
                                                className="border rounded-lg p-3 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                            >
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-24 object-cover rounded-md mb-2"
                                                    />
                                                )}
                                                <div>
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 mb-2">
                                                    <span className="text-sm font-semibold">{item.currency} {item.price}</span>
                                                    <div className="flex gap-1 text-xs">
                                                        {item.is_vegetarian && <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Veg</span>}
                                                        {item.is_spicy && <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full">Spicy</span>}
                                                        {!item.available && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Unavailable</span>}
                                                    </div>
                                                </div>
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer text-center mt-3"
                                                    disabled={!item.available}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;