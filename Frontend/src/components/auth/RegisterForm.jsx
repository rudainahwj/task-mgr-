import { useState } from "react";
import AvatarPicker from "./AvatarPicker";
import { registerUser, loginUser } from "../../services/authService";

export default function RegisterForm({ dark, onLogin}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("👩‍💻");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await registerUser(
                name,
                email,
                password,
                selectedAvatar
            );

            const user = await loginUser(email, password);

            onLogin(user);

            console.log("Registered user:", user);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const labelClass = dark
        ? "block mb-2 font-mono text-sm tracking-[0.22em] text-fuchsia-300"
        : "block mb-2 text-sm font-medium text-slate-700";

    const inputClass = dark
        ? "w-full bg-[#0a0010] border border-purple-700 px-4 py-2.5 text-purple-100 font-mono placeholder:text-purple-900 outline-none transition focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(217,70,239,0.15)]"
        : "w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <AvatarPicker
                dark={dark}
                selectedAvatar={selectedAvatar}
                onSelect={setSelectedAvatar}
            />

            {/* Name */}
            <div>
                <label
                    htmlFor="register-name"
                    className={labelClass}
                >
                    {dark ? "// NAME" : "Name"}
                </label>

                <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dark ? "your_name_" : "Your name"}
                    className={inputClass}
                    required
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="register-email"
                    className={labelClass}
                >
                    {dark ? "// EMAIL" : "Email"}
                </label>

                <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dark ? "user@domain.com_" : "you@example.com"}
                    className={inputClass}
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="register-password"
                    className={labelClass}
                >
                    {dark ? "// PASSWORD" : "Password"}
                </label>

                <input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={dark ? "••••••••_" : "Enter your password"}
                    className={inputClass}
                    required
                />
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="register-confirm-password"
                    className={labelClass}
                >
                    {dark ? "// CONFIRM PASSWORD" : "Confirm password"}
                </label>

                <input
                    id="register-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={
                        dark
                            ? "••••••••_"
                            : "Confirm your password"
                    }
                    className={inputClass}
                    required
                />
            </div>



            {error && (
                <p
                    className={
                        dark
                            ? "font-mono text-sm text-red-400"
                            : "text-sm text-red-600"
                    }
                >
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={loading}
                className={
                    dark
                        ? "w-full bg-purple-600 border border-fuchsia-400 px-6 py-3.5 font-mono font-bold tracking-[0.25em] text-white transition hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.30)] disabled:opacity-50 disabled:cursor-not-allowed"
                        : "w-full bg-purple-600 text-white rounded-lg px-6 py-3.5 font-semibold hover:bg-purple-700 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                }
            >
                {loading
                    ? (dark ? ">> CREATING... <<" : "Creating account...")
                    : (dark ? ">> CREATE ACCOUNT <<" : "Create account")}
            </button>

        </form>
    );
}