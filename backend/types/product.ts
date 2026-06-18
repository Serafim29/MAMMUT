export type ProductVariant = {
    color_name: string;
    thumbnail_url: string;
    images: string[];
    sizes: string[];
};

export type Product = {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    price: number;
    badge?: string | null;
    category: string;
    subcategory: string;
    variants: ProductVariant[];
    category_id?: string | null;
    created_at?: string;
};