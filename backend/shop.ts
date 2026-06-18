import { supabase } from "./supabase";
import type { Product, ProductVariant } from "./types/product";
import type { CartItem } from "./types/shop";
 
async function getUserId(): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}
 
export async function fetchFavoriteIds(): Promise<string[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);
  if (error) throw error;
  return (data ?? []).map((r) => r.product_id as string);
}
 
export async function fetchFavoriteProducts(): Promise<Product[]> {
  const ids = await fetchFavoriteIds();
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("products").select("*").in("id", ids);
  if (error) throw error;
  return (data ?? []) as Product[];
}
 
export async function isFavorite(productId: string): Promise<boolean> {
  const userId = await getUserId();
  if (!userId) return false;
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();
  if (error) throw error;
  return data != null;
}
 
export async function setFavorite(productId: string, favorited: boolean): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Not signed in");
  if (favorited) {
    const { error } = await supabase.from("favorites").upsert(
      { user_id: userId, product_id: productId },
      { onConflict: "user_id,product_id" }
    );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);
    if (error) throw error;
  }
}
 
export async function fetchCartLines(): Promise<CartItem[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data: rows, error } = await supabase
    .from("cart_items")
    .select("id, product_id, color_name, size, quantity, created_at, product:products (*)")
    .eq("user_id", userId);
  if (error) throw error;
  const lines: CartItem[] = [];
  for (const row of rows ?? []) {
    const p = row.product as Product | Product[] | null;
    const product = Array.isArray(p) ? p[0] : p;
    if (!product) continue;
    lines.push({
      id: row.id as string,
      user_id: userId,
      product_id: row.product_id as string,
      color_name: row.color_name as string,
      size: row.size as string,
      quantity: row.quantity as number,
      created_at: row.created_at as string,
      product,
    });
  }
  return lines;
}
 
export async function addToCart(
  productId: string,
  colorName: string,
  size: string,
  amount: number
): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Not signed in");
  if (amount <= 0) return;
 
  const { data: existing, error: selErr } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("color_name", colorName)
    .eq("size", size)
    .maybeSingle();
  if (selErr) throw selErr;
 
  if (existing) {
    const next = (existing.quantity as number) + amount;
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: next })
      .eq("id", existing.id as string);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      color_name: colorName,
      size,
      quantity: amount,
    });
    if (error) throw error;
  }
}
 
export async function setCartQuantity(lineId: string, quantity: number): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Not signed in");
  if (quantity <= 0) {
    const { error } = await supabase.from("cart_items").delete().eq("id", lineId).eq("user_id", userId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", lineId)
    .eq("user_id", userId);
  if (error) throw error;
}
 
export async function removeCartLine(lineId: string): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Not signed in");
  const { error } = await supabase.from("cart_items").delete().eq("id", lineId).eq("user_id", userId);
  if (error) throw error;
}