import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Category, CategoryPayload, Item, ItemPayload } from "@/types/menuTypes";

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>("/menu/categories/");
    return response.data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
};

export const createCategory = async (data: CategoryPayload): Promise<Category> => {
    const response = await axiosInstance.post<Category>("/menu/categories/", data);
    return response.data;
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};

export const updateCategory = async (id: number, data: CategoryPayload): Promise<Category> => {
    const response = await axiosInstance.put<Category>(`/menu/categories/${id}/`, data);
    return response.data;
};

export const useUpdateCategory = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryPayload) => updateCategory(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};

export const deleteCategory = async (id: number) => {
    await axiosInstance.delete(`/menu/categories/${id}/`);
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};


export const fetchCategoryItems = async (category_id: number): Promise<Item[]> => {
    const response = await axiosInstance.get<Item[]>(`/menu/category/${category_id}/items/`);
    return response.data;
};

export const useCategoryItems = (category_id?: number) => {
    return useQuery({
        queryKey: ["category_items", category_id],
        queryFn: () => {
            if (category_id === undefined) return Promise.resolve([] as Item[]);
            return fetchCategoryItems(category_id);
        },
        enabled: category_id !== undefined,
    });
};

export const createItem = async (data: ItemPayload): Promise<Item> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
            formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await axiosInstance.post<Item>("/menu/items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};


export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createItem,
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: ["category_items", data.category] });
        },
    });
};

export const updateItem = async (id: number, data: ItemPayload): Promise<Item> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
            formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await axiosInstance.put<Item>(`/menu/items/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const useUpdateItem = (id: number, category_id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ItemPayload) => updateItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category_items", category_id] });
        },
    });
};

export const deleteItem = async (id: number) => {
    await axiosInstance.delete(`/menu/items/${id}/`);
};

export const useDeleteItem = (category_id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category_items", category_id] });
        },
    });
};

export const fetchRestaurantCategories = async (restaurant_id: number): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>(`/menu/restaurant/${restaurant_id}/categories/`);
    return response.data;
};

export const useRestaurantCategory = (restaurant_id?: number) => {
    return useQuery({
        queryKey: ["restaurant_categories", restaurant_id],
        queryFn: () => {
            if (restaurant_id === undefined) return Promise.resolve([] as Category[]);
            return fetchRestaurantCategories(restaurant_id);
        },
        enabled: restaurant_id !== undefined,
    });
};
