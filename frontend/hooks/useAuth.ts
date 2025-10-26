import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthResponse, CustomerRegisterData, OwnerRegisterData, LoginData } from "@/types/authTypes";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

const registerCustomer = async (data: CustomerRegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/register/customer/", data);
    return response.data;
};

const registerOwner = async (data: OwnerRegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/register/owner/", data);
    return response.data;
};

const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/login/", data);
    return response.data;
};

export const useRegisterCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: registerCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useRegisterOwner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: registerOwner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};


export const useLogout = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            await axiosInstance.post("/auth/logout/");
        },
        onSuccess: () => {
            router.push("/login");
        },
        onError: (error: any) => {
            console.error("Logout failed:", error);
        },
    });
};
