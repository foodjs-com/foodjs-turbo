import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies }) => {
    const callbackName = url.searchParams.get("callback");

    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    if (!accessToken || !refreshToken) {
        return Response.json({ email: null }, { status: 200 });
    }

    const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
    });

    if (error) {
        cookies.delete("sb-access-token", {
            path: "/",
        });
        cookies.delete("sb-refresh-token", {
            path: "/",
        });
        return new Response(error.message, { status: 500 });
    }

    const email = data?.user?.email;

    if (callbackName) {
        return new Response(
            `${callbackName}(${JSON.stringify({ email })})`,
            { status: 200 }
        );
    } else {
        return Response.json({ email }, { status: 200 });
    }

};