import { useState } from "react";
import { loginUser } from "../../services/authService";

export default function LoginForm({ dark, onLogin })  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const user = await loginUser(email, password);

            onLogin(user);
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className={`block mb-2 text-sm font-medium ${
                        dark
                            ? "font-mono tracking-[0.22em] text-fuchsia-300"
                            : "text-slate-700"
                    }`}
                >
                    // EMAIL
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@domain.com_"
                    required
                    className={`w-full px-4 py-3 outline-none transition ${
                        dark
                            ? "bg-[#0a0010] border border-purple-700 text-purple-100 font-mono placeholder:text-purple-900 focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                            : "bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    }`}
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className={`block mb-2 text-sm font-medium ${
                        dark
                            ? "font-mono tracking-[0.22em] text-fuchsia-300"
                            : "text-slate-700"
                    }`}
                >
                    // PASSWORD
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••_"
                    required
                    className={`w-full px-4 py-3 outline-none transition ${
                        dark
                            ? "bg-[#0a0010] border border-purple-700 text-purple-100 font-mono placeholder:text-purple-900 focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                            : "bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    }`}
                />
            </div>


            {error && (
                <p className={dark ? "font-mono text-sm text-red-400" : "text-sm text-red-600"}>
                    {error}
                </p>
            )}

            <button
                type="submit"
                className={`w-full px-6 py-3.5 font-bold transition ${
                    dark
                        ? "bg-purple-600 border border-fuchsia-400 font-mono tracking-[0.25em] text-white hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.30)]"
                        : "bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 shadow-sm"
                }`}
            >
                {loading
                    ? (dark ? ">> SIGNING IN... <<" : "Signing in...")
                    : (dark ? ">> SIGN IN <<" : "Sign in")}
            </button>

        </form>
    );
}