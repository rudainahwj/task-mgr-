export default function PriorityBadge({ priority, dark }) {
    const base =
        "font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border";

    const variants = {
        HIGH: "text-[#ff2d78] bg-[#ff2d78]/10 border-[#ff2d78]/40",
        MEDIUM: "text-[#ffb800] bg-[#ffb800]/10 border-[#ffb800]/40",
        LOW: "text-[#00d68f] bg-[#00d68f]/10 border-[#00d68f]/40",
    };

    const labels = {
        HIGH: "HIGH",
        MEDIUM: "MED",
        LOW: "LOW",
    };

    return (
        <span
            className={`${base} ${
                variants[priority] || variants.MEDIUM
            } ${dark ? "rounded-none" : "rounded"}`}
        >
            {labels[priority] || "MED"}
        </span>
    );
}