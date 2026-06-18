import { Product } from "./product";

export type CartItem = {
    id?: string;
    user_id?: string | null;
    product_id: string;
    color_name: string;
    size: string;
    quantity: number;
    created_at?: string;
    product?: Product;
};


