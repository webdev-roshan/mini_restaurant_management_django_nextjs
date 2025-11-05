"use client";

import { useState, useEffect, useRef } from "react";
import { useUpdateItem, useCategoryItems } from "@/hooks/useMenu";
import { ItemPayload } from "@/types/menuTypes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemId: number;
    categoryId: number;
}

const UpdateItemForm = ({ itemId, categoryId }: Props) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<ItemPayload>({
        category: categoryId,
        name: "",
        description: "",
        currency: "USD",
        price: 0,
        available: true,
        image: null,
        is_vegetarian: false,
        is_spicy: false,
    });

    const { data: items } = useCategoryItems(categoryId);
    const { mutate, isPending, error } = useUpdateItem(itemId, categoryId);

    const item = items?.find(i => i.id === itemId);

    useEffect(() => {
        if (item) {
            setFormData({
                category: categoryId,
                name: item.name,
                description: item.description,
                currency: item.currency,
                price: item.price,
                available: item.available,
                image: null,
                is_vegetarian: item.is_vegetarian,
                is_spicy: item.is_spicy,
            });
        }
    }, [item, categoryId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            const files = (e.target as HTMLInputElement).files;
            if (files && files[0]) {
                setFormData(prev => ({ ...prev, image: files[0] }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "price" ? (value === "" ? 0 : parseFloat(value)) : value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || formData.price <= 0) {
            alert("Please fill in all required fields and ensure price is greater than 0.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                router.back();
            },
        });
    };

    if (!item || !categoryId) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Update Item</h1>

            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    This item belongs to the selected category.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g., Margherita Pizza"
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
                        placeholder="Describe this item..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 h-24"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="INR">INR</option>
                            <option value="NPR">NPR</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={formData.price || ""}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image (optional)</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="w-full"
                    />
                    {item?.image && (
                        <p className="text-sm text-gray-500 mt-1">Current: {item.image}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                            className="rounded"
                        />
                        <span className="text-sm">Available</span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_vegetarian"
                            checked={formData.is_vegetarian}
                            onChange={handleChange}
                            className="rounded"
                        />
                        <span className="text-sm">Vegetarian</span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_spicy"
                            checked={formData.is_spicy}
                            onChange={handleChange}
                            className="rounded"
                        />
                        <span className="text-sm">Spicy</span>
                    </label>
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
                        {isPending ? "Updating..." : "Update Item"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">
                        {(error as any)?.response?.data?.message || "Failed to update item"}
                    </p>
                )}
            </form>
        </div>
    );
};

export default UpdateItemForm;
