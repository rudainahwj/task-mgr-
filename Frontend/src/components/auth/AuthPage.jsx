import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage({
                                     initialMode = "login",
                                     dark,
                                     onToggleTheme,
                                     onBack,
                                     onLogin
                                 }) {
    const [mode, setMode] = useState(initialMode);
    const isLogin = mode === "login";

    return (
        <main
            className={`min-h-screen relative overflow-hidden ${
                dark
                    ? "bg-[#050008] text-white"
                    : "bg-[#f8f9fc] text-slate-900"
            }`}
        >
            {/* Header */}
            <header
                className={`h-[72px] flex items-center justify-between px-6 md:px-10 border-b ${
                    dark
                        ? "border-purple-900/50"
                        : "bg-white border-slate-200"
                }`}
            >
                <button
                    type="button"
                    onClick={onBack}
                    className={
                        dark
                            ? "font-mono font-bold tracking-[0.18em] text-xl md:text-2xl cursor-pointer"
                            : "font-semibold text-xl tracking-tight"
                    }
                    style={
                        dark
                            ? {
                                textShadow:
                                    "2px 0 #67e8f9, -2px 0 #d946ef"
                            }
                            : undefined
                    }
                >
                    {dark ? "TASK://MGR" : "Task Manager"}
                </button>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className={
                            dark
                                ? "border border-cyan-900 px-4 py-2 font-mono text-sm tracking-[0.2em] text-cyan-300 hover:border-cyan-400 transition"
                                : "px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                        }
                    >
                        {dark ? "☼ LIGHT" : "☾ Dark mode"}
                    </button>

                    <button
                        type="button"
                        onClick={onBack}
                        className={
                            dark
                                ? "font-mono text-sm tracking-[0.2em] text-cyan-300 hover:text-white transition"
                                : "px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                        }
                    >
                        {dark ? "<< BACK" : "← Back"}
                    </button>
                </div>
            </header>

            {/* Y2K stars - dark mode only */}
            {dark && (
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <span className="absolute top-[15%] left-[8%]">·</span>
                    <span className="absolute top-[22%] left-[20%] text-purple-400">
                        ✦
                    </span>
                    <span className="absolute top-[18%] right-[15%]">·</span>
                    <span className="absolute top-[38%] right-[8%] text-cyan-300">
                        ·
                    </span>
                    <span className="absolute bottom-[18%] left-[12%] text-purple-300">
                        ✦
                    </span>
                    <span className="absolute bottom-[12%] right-[18%]">·</span>
                </div>
            )}

            {/* Auth content */}
            <section
                className={`relative flex justify-center px-5 ${
                    dark
                        ? "py-12 md:py-16"
                        : "min-h-[calc(100vh-72px)] items-center py-12"
                }`}
            >
                <div className={dark ? "w-full max-w-[680px]" : "w-full max-w-md"}>

                    {/* Intro */}
                    <div className="text-center mb-8">
                        {dark ? (
                            <>
                                <p className="font-mono text-xs md:text-sm tracking-[0.35em] text-cyan-300 mb-4">
                                    &gt;&gt; SECURE ACCESS PORTAL &lt;&lt;
                                </p>

                                <div className="text-4xl mb-4">
                                    🔮
                                </div>

                                <h1
                                    className="font-mono font-bold text-3xl md:text-4xl tracking-[0.12em]"
                                    style={{
                                        textShadow:
                                            "2px 0 #67e8f9, -2px 0 #d946ef"
                                    }}
                                >
                                    {isLogin
                                        ? "WELCOME BACK"
                                        : "CREATE ACCOUNT"}
                                </h1>
                            </>
                        ) : (
                            <>
                                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
                                    ✓
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                    {isLogin
                                        ? "Welcome back"
                                        : "Create your account"}
                                </h1>

                                <p className="mt-2 text-slate-500">
                                    {isLogin
                                        ? "Sign in to continue managing your tasks."
                                        : "Start organizing your tasks and priorities."}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Auth card */}
                    <div
                        className={
                            dark
                                ? "border border-purple-800 bg-[#0d0014]/90 p-6 md:p-8"
                                : "bg-white border border-slate-200 rounded-2xl shadow-sm p-7"
                        }
                    >
                        {/* Tabs */}
                        <div
                            className={
                                dark
                                    ? "grid grid-cols-2 border-b border-purple-900 mb-8"
                                    : "grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-7"
                            }
                        >
                            <button
                                type="button"
                                onClick={() => setMode("login")}
                                className={
                                    dark
                                        ? `pb-4 font-mono tracking-[0.2em] transition ${
                                            isLogin
                                                ? "text-purple-200 border-b-2 border-fuchsia-400"
                                                : "text-purple-900 hover:text-purple-500"
                                        }`
                                        : `py-2.5 rounded-lg text-sm font-semibold transition ${
                                            isLogin
                                                ? "bg-white text-purple-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`
                                }
                            >
                                {dark ? "[ SIGN IN ]" : "Sign in"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode("register")}
                                className={
                                    dark
                                        ? `pb-4 font-mono tracking-[0.2em] transition ${
                                            !isLogin
                                                ? "text-purple-200 border-b-2 border-fuchsia-400"
                                                : "text-purple-900 hover:text-purple-500"
                                        }`
                                        : `py-2.5 rounded-lg text-sm font-semibold transition ${
                                            !isLogin
                                                ? "bg-white text-purple-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`
                                }
                            >
                                {dark ? "[ REGISTER ]" : "Register"}
                            </button>
                        </div>

                        {/* Shared form */}
                        {isLogin ? (
                            <LoginForm
                                dark={dark}
                                onLogin={onLogin}
                            />
                        ) : (
                            <RegisterForm
                                dark={dark}
                                onLogin={onLogin}
                            />
                        )}
                    </div>

                    {/* Dark mode footer */}
                    {dark && (
                        <p className="text-center mt-6 font-mono text-xs tracking-[0.2em] text-purple-900">
                            {isLogin
                                ? "// register to get started //"
                                : "// your workspace awaits //"}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}