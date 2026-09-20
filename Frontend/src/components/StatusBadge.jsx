import { STATUS_LABELS } from "../constants/taskConstants";

export default function StatusBadge({ status, dark }) {
    const base =
        "font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border";

    const variants = {
        PENDING: "text-blue-300 bg-blue-300/10 border-blue-300/30",
        IN_PROGRESS:
            "text-[#00ffcc] bg-[#00ffcc]/10 border-[#00ffcc]/30",
        DONE: "text-[#00d68f] bg-[#00d68f]/10 border-[#00d68f]/30",
        CANCELLED:
            "text-zinc-500 bg-zinc-500/10 border-zinc-500/30",
    };

    return (
        <span
            className={`${base} ${
                variants[status] || variants.PENDING
            } ${dark ? "rounded-none" : "rounded"}`}
        >
            {STATUS_LABELS[status] || "Pending"}
        </span>
    );
}