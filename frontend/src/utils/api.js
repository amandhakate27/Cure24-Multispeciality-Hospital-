export const getApiBase = () => {
    const envBase = import.meta.env.VITE_API_BASE;
    if (!envBase) return "";
    return String(envBase).replace(/\/$/, "");
};

export const buildApiUrl = (path) => {
    const base = getApiBase();
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
};
