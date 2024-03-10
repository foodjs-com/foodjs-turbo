import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const access_token = url.searchParams.get("access_token");
    const refresh_token = url.searchParams.get("refresh_token");
    if (!access_token || !refresh_token) {
        return new Response("No access_token or refresh_token provided", {
            status: 400,
        });
    }
    cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });
    return redirect("/dashboard");
};