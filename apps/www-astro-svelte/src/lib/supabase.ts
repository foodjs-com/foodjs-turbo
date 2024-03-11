import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            flowType: "pkce",
        },
    },
);

// Get a specific cookie value
function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}


export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }
    if (!data.session) {
        const accessToken = getCookie("sb-access-token");
        const refreshToken = getCookie("sb-refresh-token");
        console.log(accessToken, refreshToken);
        if (!accessToken || !refreshToken) {
            return null;
        }
        const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        if (error) {
            throw error;
        }
        return data;
    } else {
        console.log("already logged in!");
    }
    return data;
}