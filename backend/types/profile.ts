export type Profile = {
    id: string;
    email?: string | null;
    username?: string | null;
    full_name?: string | null;
    dob?: string | null;
    country?: string | null;
    shopping_preference?: string | null;
    newsletter_subscribed: boolean;
    created_at: string;
    updated_at: string;
};
