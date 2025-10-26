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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const deleteCategory = async (id: number) => {
    await axiosInstance.delete(`/menu/categories/${id}/`);
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const fetchItems = async (): Promise<Item[]> => {
    const response = await axiosInstance.get<Item[]>("/menu/items/");
    return response.data;
};

export const useItems = () => {
    return useQuery({
        queryKey: ["items"],
        queryFn: fetchItems,
    });
};

export const createItem = async (data: ItemPayload): Promise<Item> => {
    const response = await axiosInstance.post<Item>("/menu/items/", data);
    return response.data;
};

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const updateItem = async (id: number, data: ItemPayload): Promise<Item> => {
    const response = await axiosInstance.put<Item>(`/menu/items/${id}/`, data);
    return response.data;
};

export const useUpdateItem = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ItemPayload) => updateItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const deleteItem = async (id: number) => {
    await axiosInstance.delete(`/menu/items/${id}/`);
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
