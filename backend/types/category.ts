export type Category = {
    id: string;
    name: string;
    parent_id?: string | null;
    image_url?: string | null;
    slug: string;
    display_order?: number;
    created_at?: string;
};
