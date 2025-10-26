export interface RestaurantOwnerProfile {
    restaurant_name: string;
    description: string;
    address?: string;
}

export interface User {
    id: number;
    fullname: string;
    email: string;
    gender?: "M" | "F" | "O";
    phone_number: string;
    user_type: "customer" | "owner" | "admin";
    owner_profile?: RestaurantOwnerProfile;
}

export interface CustomerRegisterData {
    fullname: string;
    email: string;
    password: string;
    gender?: "M" | "F" | "O";
    phone_number: string;
}

export interface OwnerRegisterData {
    fullname: string;
    email: string;
    password: string;
    gender?: "M" | "F" | "O";
    phone_number: string;
    restaurant_name: string;
    description: string;
    address?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    message: string;
}
