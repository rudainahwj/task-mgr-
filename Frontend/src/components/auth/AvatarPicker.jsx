const avatars = ["👩‍💻", "👨‍💻", "🧑‍🚀", "🧙‍♀️", "🥷", "🤖"];

export default function AvatarPicker({
                                         dark,
                                         selectedAvatar,
                                         onSelect
                                     }) {
    return (
        <div>
            <p
                className={
                    dark
                        ? "mb-3 font-mono text-sm tracking-[0.22em] text-fuchsia-300"
                        : "mb-3 text-sm font-medium text-slate-700"
                }
            >
                {dark ? "// SELECT AVATAR" : "Choose an avatar"}
            </p>

            <div className="flex flex-wrap gap-2">
                {avatars.map((avatar) => {
                    const selected = selectedAvatar === avatar;

                    return (
                        <button
                            key={avatar}
                            type="button"
                            onClick={() => onSelect(avatar)}
                            className={
                                dark
                                    ? `w-11 h-11 flex items-center justify-center text-xl border transition ${
                                        selected
                                            ? "border-fuchsia-400 bg-purple-900/50 shadow-[0_0_15px_rgba(217,70,239,0.25)]"
                                            : "border-purple-800 bg-[#0a0010] hover:border-purple-500"
                                    }`
                                    : `w-11 h-11 flex items-center justify-center text-xl rounded-lg border transition ${
                                        selected
                                            ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                                            : "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
                                    }`
                            }
                        >
                            {avatar}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}