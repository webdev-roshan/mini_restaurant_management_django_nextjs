"use client";

import { useState, useRef } from "react";
import { useCreateItem, useRestaurantCategory } from "@/hooks/useMenu";
import { ItemPayload } from "@/types/menuTypes";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Utensils, FileText, DollarSign } from "lucide-react";

const CreateItemForm = () => {
    const router = useRouter();
    const params = useParams();
    const restaurantId = Number(params.restaurant_id);
    const categoryId = Number(params.category_id);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: restaurantCategories } = useRestaurantCategory(restaurantId);
    const currentCategory = restaurantCategories?.find(c => c.id === categoryId);
    restaurantCategories?.map((a) => (console.log(a.restaurant_name)))

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
            if (files && files[0]) setFormData(prev => ({ ...prev, image: files[0] }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "price" ? parseFloat(value) || 0 : value,
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
                setFormData({
                    ...formData,
                    name: "",
                    description: "",
                    price: 0,
                    image: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
                router.push(`/dashboard/owner/restaurants/${restaurantId}/menu/categories/${categoryId}/items`);
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-300"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Create New Menu Item</h1>
                    <p className="text-gray-600">Add a new item to your category</p>
                </div>
            </div>

            {/* Info message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                    <strong>Restaurant Name:</strong> {restaurantCategories?.map((restaurant) => restaurant.restaurant_name)}
                </p>
                <p className="text-sm text-blue-800">
                    <strong>Category:</strong>{" "}
                    {currentCategory ? currentCategory.name : `#${categoryId}`}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                    This item will be created under the selected category.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Item Name *
                            </label>
                            <div className="relative">
                                <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g., Margherita Pizza"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-4 text-gray-400" size={20} />
                                <textarea
                                    name="description"
                                    placeholder="Describe this delicious item..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none h-32"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency *
                                </label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="INR">INR (₹)</option>
                                    <option value="NPR">NPR (₨)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="0.00"
                                        value={formData.price || ""}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Item Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-600"
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isPending ? "Creating..." : "Create Item"}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm">
                                    {(error as any)?.response?.data?.message || "Failed to create menu item"}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateItemForm;
