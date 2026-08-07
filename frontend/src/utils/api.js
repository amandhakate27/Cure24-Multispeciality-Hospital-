export const getApiBase = () => {
    const envBase = import.meta.env.VITE_API_BASE;
    if (envBase) return String(envBase).replace(/\/$/, "");

    if (import.meta.env.DEV && typeof window !== "undefined" && window.location.port !== "5000") {
        return "http://localhost:5000";
    }

    return "";
};

export const buildApiUrl = (path) => {
    const base = getApiBase();
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
};

export const buildAssetUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return buildApiUrl(path);
};
