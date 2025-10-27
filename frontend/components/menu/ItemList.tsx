"use client";

import { useItems, useDeleteItem, useCategories } from "@/hooks/useMenu";
import { Edit, Trash2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ItemList = () => {
    const { data: items, isLoading, error } = useItems();
    const { data: categories } = useCategories();
    const deleteMutation = useDeleteItem();
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get("category");

    const filteredItems = useMemo(() => {
        if (!items) return [];
        if (!categoryFilter) return items;
        return items.filter(item => item.category === parseInt(categoryFilter));
    }, [items, categoryFilter]);

    const getCategoryName = (categoryId: number) => {
        return categories?.find(c => c.id === categoryId)?.name || "Unknown Category";
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p>Loading items...</p>;
    if (error) return <p className="text-red-500">Error loading items.</p>;
    
    if (!filteredItems || filteredItems.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                    {categoryFilter ? "No items found in this category." : "No items found."}
                </p>
                <button
                    onClick={() => router.push("/dashboard/owner/menu/items/create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Create First Item
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Menu Items</h2>
                    {categoryFilter && (
                        <p className="text-gray-600">
                            Category: {getCategoryName(parseInt(categoryFilter))}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    {categoryFilter && (
                        <button
                            onClick={() => router.push("/dashboard/owner/menu/items")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Show All Items
                        </button>
                    )}
                    <button
                        onClick={() => router.push("/dashboard/owner/menu/items/create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Item
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-md relative">
                        {item.image && (
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-40 object-cover rounded-md mb-2" 
                            />
                        )}
                        
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => router.push(`/dashboard/owner/menu/items/update/${item.id}`)}
                                className="p-1 bg-yellow-200 rounded hover:bg-yellow-300"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 bg-red-200 rounded hover:bg-red-300"
                                disabled={deleteMutation.isPending}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
                        
                        <div className="space-y-1 text-sm">
                            <p className="font-semibold text-green-600">
                                {item.currency} {item.price}
                            </p>
                            <p className="text-gray-500">
                                Category: {getCategoryName(item.category)}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className={`px-2 py-1 rounded text-xs ${
                                    item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                    {item.available ? "Available" : "Unavailable"}
                                </span>
                                {item.is_vegetarian && (
                                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                        Vegetarian
                                    </span>
                                )}
                                {item.is_spicy && (
                                    <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
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