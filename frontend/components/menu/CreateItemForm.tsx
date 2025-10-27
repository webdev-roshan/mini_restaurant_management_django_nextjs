"use client";

import { useState, useRef } from "react";
import { useCreateItem, useCategories } from "@/hooks/useMenu";
import { ItemPayload } from "@/types/menuTypes";
import { useRouter } from "next/navigation";

const CreateItemForm = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<ItemPayload>({
        category: 0,
        name: "",
        description: "",
        currency: "USD",
        price: 0,
        available: true,
        image: null,
        is_vegetarian: false,
        is_spicy: false,
    });

    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const { mutate, isPending, error } = useCreateItem();

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
                [name]: name === "category" || name === "price" ? 
                    (value === "" ? 0 : parseFloat(value)) : value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.category || formData.price <= 0) {
            alert("Please fill in all required fields and ensure price is greater than 0.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    category: 0,
                    name: "",
                    description: "",
                    currency: "USD",
                    price: 0,
                    available: true,
                    image: null,
                    is_vegetarian: false,
                    is_spicy: false,
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
                router.push("/dashboard/owner/menu/items");
            },
        });
    };

    if (categoriesLoading) return <p>Loading categories...</p>;

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Item</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories?.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

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
                        {isPending ? "Creating..." : "Create Item"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">
                        {(error as any)?.response?.data?.message || "Failed to create item"}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CreateItemForm;