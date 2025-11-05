export interface Item {
    id: number;
    category: number;
    name: string;
    description: string;
    currency: "USD" | "EUR" | "INR" | "NPR";
    price: number;
    available: boolean;
    image?: string;
    is_vegetarian: boolean;
    is_spicy: boolean;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    restaurant: number;
    restaurant_name: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    menu_items?: Item[];
}

export interface CategoryPayload {
    restaurant: number;
    name: string;
    description: string;
}

export interface ItemPayload {
    category: number;
    name: string;
    description: string;
    currency: "USD" | "EUR" | "INR" | "NPR";
    price: number;
    available?: boolean;
    image?: File | null;
    is_vegetarian?: boolean;
    is_spicy?: boolean;
}
