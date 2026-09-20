import PriorityBadge from "./PriorityBadge.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { STATUS_LABELS } from "../constants/taskConstants";
import { formatDate, isOverdue } from "../utils/taskUtils";

export default function TaskCard({
                                     task,
                                     dark,
                                     onDelete,
                                     onStatusChange,
                                     onEdit,
                                 }) {
    const overdue = isOverdue(task.dueDate, task.status);
    const done = task.status === "DONE";
    const cancelled = task.status === "CANCELLED";

    return (
        <div className={`flex flex-col gap-3 p-4 transition-all duration-150 group
      ${dark
            ? "bg-[#0f0018] border border-fuchsia-500/30 hover:-translate-y-0.5 hover:shadow-[0_0_20px_#ff00ff22] hover:border-fuchsia-400/50"
            : "bg-white border border-slate-200 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md"
        }
      ${cancelled ? "opacity-50" : ""}
    `}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className={`leading-snug font-semibold
            ${dark ? "font-['VT323'] text-xl tracking-wide" : "font-['Inter'] text-sm"}
            ${done ? "line-through" : ""}
            ${done || cancelled ? "text-zinc-500" : dark ? "text-fuchsia-100" : "text-slate-800"}
          `}>
            {task.title}
          </span>
                    {task.description && (
                        <p className={`text-xs leading-relaxed ${dark ? "font-mono text-fuchsia-300/60" : "text-slate-500"}`}>
                            {task.description}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className={`flex-shrink-0 text-xs px-2 py-1 border transition-colors cursor-pointer
            ${
                            dark
                                ? "font-mono border-cyan-500/30 text-cyan-400/70 hover:border-cyan-400 hover:text-cyan-300"
                                : "border-slate-200 text-slate-400 hover:border-violet-400 hover:text-violet-600 rounded"
                        }`}
                    >
                        EDIT
                    </button>

                    <button
                        onClick={() => onDelete(task._id || task.id)}
                        className={`flex-shrink-0 text-xs px-2 py-1 border transition-colors cursor-pointer
            ${
                            dark
                                ? "font-mono border-fuchsia-500/30 text-fuchsia-500/50 hover:border-red-400 hover:text-red-400"
                                : "border-slate-200 text-slate-300 hover:border-red-400 hover:text-red-400 rounded"
                        }`}
                    >
                        {dark ? "DEL" : "✕"}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <PriorityBadge priority={task.priority} dark={dark} />
                <StatusBadge status={task.status} dark={dark} />
                {task.dueDate && (
                    <span className={`font-mono text-[10px] tracking-wide ${overdue ? "text-[#ff2d78]" : dark ? "text-fuchsia-500/60" : "text-slate-400"}`}>
            {dark ? "DUE: " : "Due: "}{formatDate(task.dueDate)}{overdue && " ⚠"}
          </span>
                )}
            </div>

            <div className={`flex flex-wrap gap-1.5 pt-2 ${dark ? "border-t border-fuchsia-500/20" : "border-t border-slate-100"}`}>
                {["PENDING", "IN_PROGRESS", "DONE", "CANCELLED"].map((s) => {
                    const active = task.status === s;
                    return (
                        <button
                            key={s}
                            onClick={() => onStatusChange(task._id || task.id, s)}
                            className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border transition-colors cursor-pointer
                ${dark
                                ? active
                                    ? "border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10"
                                    : "border-fuchsia-500/20 text-fuchsia-500/40 hover:border-fuchsia-500/50 hover:text-fuchsia-400"
                                : active
                                    ? "border-violet-400 text-violet-600 bg-violet-50 rounded"
                                    : "border-slate-200 text-slate-400 hover:border-violet-300 hover:text-violet-500 rounded"
                            }
              `}
                        >
                            {STATUS_LABELS[s]}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}