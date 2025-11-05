import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Restaurant, CreateRestaurantData, UpdateRestaurantData, OwnerRestaurantResponse } from "@/types/restaurantTypes";

export const fetchAllRestaurants = async (): Promise<Restaurant[]> => {
    const response = await axiosInstance.get<Restaurant[]>("/restaurants/all/");
    return response.data;
};

export const useAllRestaurants = () => {
    return useQuery({
        queryKey: ["restaurants", "all"],
        queryFn: fetchAllRestaurants,
    });
};

export const fetchOwnerRestaurants = async (): Promise<OwnerRestaurantResponse[]> => {
    const response = await axiosInstance.get<OwnerRestaurantResponse[]>("/restaurants/owner/");
    return response.data;
};

export const useOwnerRestaurants = () => {
    return useQuery({
        queryKey: ["restaurants", "owner"],
        queryFn: fetchOwnerRestaurants,
    });
};


export const fetchOwnerRestaurant = async (restaurant_id: number): Promise<OwnerRestaurantResponse> => {
    const response = await axiosInstance.get<OwnerRestaurantResponse>(`/restaurants/owner/${restaurant_id}/`);
    return response.data;
};

export const useOwnerRestaurant = (restaurant_id: number) => {
    return useQuery({
        queryKey: ["restaurants", "owner", restaurant_id],
        queryFn: () => fetchOwnerRestaurant(restaurant_id),
        enabled: !!restaurant_id,
    });
};

export const createRestaurant = async (data: CreateRestaurantData): Promise<OwnerRestaurantResponse> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.address) formData.append("address", data.address);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.post<OwnerRestaurantResponse>("/restaurants/owner/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};

export const useCreateRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants", "owner"] });
        },
    });
};

export const updateRestaurant = async (id: number, data: UpdateRestaurantData): Promise<OwnerRestaurantResponse> => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.address) formData.append("address", data.address);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.put<OwnerRestaurantResponse>(`/restaurants/owner/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};

export const useUpdateRestaurant = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateRestaurantData) => updateRestaurant(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants", "owner"] });
        },
    });
};

export const deleteRestaurant = async (id: number) => {
    await axiosInstance.delete(`/restaurants/owner/${id}/`);
};

export const useDeleteRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants", "owner"] });
        },
    });
};
