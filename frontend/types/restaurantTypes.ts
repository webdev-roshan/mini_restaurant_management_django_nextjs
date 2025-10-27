export interface Restaurant {
    id: number;
    name: string;
    description: string;
    address?: string;
    image?: string;
    owner: number;
}

export interface OwnerRestaurantResponse {
    id: number;
    name: string;
    description: string;
    address?: string;
    image?: string;
}

export interface CreateRestaurantData {
    name: string;
    description: string;
    address?: string;
    image?: File | null;
}
