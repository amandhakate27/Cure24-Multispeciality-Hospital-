import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../utils/api";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // ✅ Relative API call (same domain)
            const response = await fetch(buildApiUrl("/api/admin/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const rawText = await response.text();
            let data = null;
            if (rawText) {
                try {
                    data = JSON.parse(rawText);
                } catch (parseError) {
                    data = null;
                }
            }

            if (!response.ok) {
                const message =
                    data?.message ||
                    rawText ||
                    response.statusText ||
                    "Invalid username or password";
                throw new Error(message);
            }

            if (!data?.token) {
                throw new Error("Login failed. No token received.");
            }

            localStorage.setItem("adminToken", data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            const fallback =
                err?.message === "Failed to fetch"
                    ? "Unable to reach server. Check backend URL and CORS."
                    : "Login failed";
            setError(err?.message || fallback);
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleEnterToSubmit = (event) => {
        if (event.key === "Enter") {
            event.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#041AA9" }}
        >
            <div className="w-full max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
                        Admin Login
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Cure 24 Hospital Management
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleEnterToSubmit}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleEnterToSubmit}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
