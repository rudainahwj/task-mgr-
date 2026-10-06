export default function LandingPage({ dark, onToggleTheme, onSignIn, onGetStarted }) {
    return dark ? (
        // =========================
        // DARK MODE — Y2K / RETRO
        // =========================
        <main className="min-h-screen bg-[#050008] text-white relative overflow-hidden">

            <header className="h-[72px] border-b border-purple-900/50 flex items-center justify-between px-6 md:px-10">
                <div
                    className="font-mono font-bold tracking-[0.18em] text-xl md:text-2xl"
                    style={{ textShadow: "2px 0 #67e8f9, -2px 0 #d946ef" }}
                >
                    TASK://MGR
                </div>

                <button
                    type="button"
                    onClick={onToggleTheme}
                    className="border border-cyan-900 px-5 py-2 font-mono tracking-[0.2em] text-cyan-300 hover:border-cyan-400 transition"
                >
                    ☼ LIGHT
                </button>
            </header>

            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <span className="absolute top-[18%] left-[10%] text-purple-400">✦</span>
                <span className="absolute top-[25%] right-[15%] text-cyan-400">·</span>
                <span className="absolute top-[45%] left-[18%] text-cyan-400">·</span>
                <span className="absolute bottom-[25%] right-[12%] text-purple-400">✦</span>
                <span className="absolute bottom-[18%] left-[28%] text-purple-700">·</span>
                <span className="absolute top-[15%] right-[35%] text-purple-700">·</span>
            </div>

            <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-6">
                <div className="max-w-4xl mx-auto text-center">

                    <p className="font-mono tracking-[0.35em] text-cyan-300 text-xs md:text-sm mb-7">
                        &gt;&gt; YOUR PERSONAL PRODUCTIVITY SYSTEM &lt;&lt;
                    </p>

                    <div className="text-4xl md:text-5xl mb-5">
                        🔮
                    </div>

                    <h1
                        className="font-mono font-bold text-4xl md:text-5xl tracking-[0.12em] mb-5"
                        style={{
                            textShadow: "3px 0 #67e8f9, -3px 0 #d946ef"
                        }}
                    >
                        TASK://MGR
                    </h1>

                    <p className="text-base md:text-lg text-purple-100/70 max-w-xl mx-auto leading-relaxed">
                        Organize your tasks, focus on what matters,
                        and turn plans into progress.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={onGetStarted}
                            className="bg-purple-600 border border-fuchsia-400 px-7 py-3 font-mono font-bold tracking-[0.2em] hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.30)] transition"
                        >
                            &gt;&gt; GET STARTED
                        </button>

                        <button
                            onClick={onSignIn}
                            className="border border-cyan-700 px-7 py-3 font-mono font-bold tracking-[0.2em] text-cyan-300 hover:border-cyan-300 transition"
                        >
                            [ SIGN IN ]
                        </button>
                    </div>

                    <p className="mt-12 font-mono text-xs tracking-[0.25em] text-purple-900">
                        // PLAN · PRIORITIZE · COMPLETE //
                    </p>

                </div>
            </section>
        </main>
    ) : (
        // =========================
        // LIGHT MODE — MODERN
        // =========================
        <main className="min-h-screen bg-[#f8f9fc] text-slate-900">

            <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10">
                <div className="font-semibold text-xl tracking-tight">
                    Task Manager
                </div>

                <button
                    type="button"
                    onClick={onToggleTheme}
                    className="border border-slate-300 bg-white px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                    ☾ Dark mode
                </button>
            </header>

            <section className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6">
                <div className="max-w-3xl mx-auto text-center">

                    <div className="w-16 h-16 mx-auto mb-7 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
                        ✓
                    </div>

                    <p className="text-sm font-semibold text-purple-600 mb-4">
                        Simple. Focused. Productive.
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                        Organize your work.
                        <br />
                        Get more done.
                    </h1>

                    <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                        A simple task manager that helps you organize priorities,
                        manage deadlines and stay focused on what matters.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

                        <button
                            onClick={onGetStarted}
                            className="bg-purple-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-purple-700 shadow-sm transition"
                        >
                            Get started
                        </button>

                        <button
                            onClick={onSignIn}
                            className="bg-white border border-slate-300 text-slate-700 px-7 py-3 rounded-lg font-semibold hover:bg-slate-50 transition"
                        >
                            Sign in
                        </button>

                    </div>

                    <p className="mt-12 text-sm text-slate-400">
                        Plan your tasks · Set priorities · Track progress
                    </p>

                </div>
            </section>
        </main>
    );
}