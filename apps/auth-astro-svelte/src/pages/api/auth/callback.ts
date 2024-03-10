import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const authCode = url.searchParams.get("code");

    if (!authCode) {
        return new Response("No code provided", { status: 400 });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    const { access_token, refresh_token } = data.session;

    cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });

    let lastReferer = cookies.get("last-referer") || null;
    console.log("lastReferer", lastReferer);

    if (lastReferer) {
        cookies.delete("last-referer", { path: "/" });
        return redirect(`${lastReferer.value}api/auth/setcookies?access_token=${access_token}&refresh_token=${refresh_token}`);
        // return new Response(`${lastReferer.value}api/auth/setcookies?access_token=${access_token}&refresh_token=${refresh_token}`, { status: 200 })
    } else {
        return redirect("/dashboard");
    }
};