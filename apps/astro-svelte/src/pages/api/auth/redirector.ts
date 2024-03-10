import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import isDev from "../../../lib/isDev";

export const GET: APIRoute = async ({ url, cookies, request, redirect }) => {
    const referer = request.headers.get("referer");
    if (referer) {
        cookies.set("last-referer", referer, { path: "/" });
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${isDev ? 'http://localhost:4322' : 'https://manuth4322.foodjs.com'}/api/auth/callback`
        },
    });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    // return redirect(data.url);
    return new Response(
        `<a href="${data.url}">Click here to login</a>`,
        { status: 200, headers: { "content-type": "text/html" } }
    );


};