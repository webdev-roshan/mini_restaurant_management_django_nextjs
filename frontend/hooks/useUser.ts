import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/authTypes";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

const getUser = async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/auth/profile/");
    return response.data;
};

export const useUser = () => {
    return useQuery<User, AxiosError>({
        queryKey: ["profile"],
        queryFn: getUser,
        retry: false,
    });
};
