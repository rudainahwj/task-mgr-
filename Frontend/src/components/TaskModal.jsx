import { useId, useState } from "react";

export default function TaskModal({
                                      mode,
                                      task = null,
                                      dark,
                                      onClose,
                                      onSubmit,
                                  }) {
    const uid = useId();
    const isEdit = mode === "edit";

    const [title, setTitle] = useState(isEdit ? task?.title || "" : "");
    const [description, setDescription] = useState(
        isEdit ? task?.description || "" : ""
    );
    const [dueDate, setDueDate] = useState(
        isEdit && task?.dueDate ? task.dueDate.slice(0, 16) : ""
    );
    const [status, setStatus] = useState(
        isEdit ? task?.status || "PENDING" : "PENDING"
    );
    const [priority, setPriority] = useState(
        isEdit ? task?.priority || "MEDIUM" : "MEDIUM"
    );

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const submit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const taskData = {
                title: title.trim(),
                description: description.trim(),
                dueDate,
                status,
                priority,
            };

            if (isEdit) {
                await onSubmit(task.id, taskData);
            } else {
                await onSubmit(taskData);
            }

            onClose();
        } catch (err) {
            console.error(
                isEdit ? "Failed to update task:" : "Failed to create task:",
                err
            );

            setError(
                isEdit
                    ? "Failed to update task."
                    : "Failed to save task to database."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const labelCls = dark
        ? `block mb-1 font-mono text-[11px] uppercase tracking-[0.18em] ${
            isEdit ? "text-cyan-400" : "text-fuchsia-400"
        }`
        : "block mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500";

    const inputCls = dark
        ? `w-full px-3 py-2 text-sm font-mono bg-[#0d0020] border ${
            isEdit
                ? "border-cyan-500/60 text-cyan-100 placeholder-cyan-900 focus:border-cyan-400 focus:shadow-[0_0_8px_#00ffff88]"
                : "border-fuchsia-500/60 text-fuchsia-100 placeholder-fuchsia-900 focus:border-fuchsia-400 focus:shadow-[0_0_8px_#ff00ff88]"
        } focus:outline-none transition-shadow`
        : "w-full px-3 py-2 text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition";

    const selectCls = inputCls;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                dark
                    ? "bg-[#05000f]/90 backdrop-blur-sm"
                    : "bg-slate-900/40 backdrop-blur-md"
            }`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-lg mx-4 p-6 relative max-h-[90vh] overflow-y-auto ${
                    dark
                        ? isEdit
                            ? "bg-[#0f0018] border border-cyan-500/50 shadow-[0_0_40px_#00ffff22]"
                            : "bg-[#0f0018] border border-fuchsia-500/50 shadow-[0_0_40px_#ff00ff22]"
                        : "bg-white border border-slate-200 rounded-2xl shadow-2xl"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className={
                            dark
                                ? `font-['VT323'] text-3xl ${
                                    isEdit
                                        ? "text-cyan-400"
                                        : "text-fuchsia-400"
                                } tracking-[0.15em] ${
                                    !isEdit ? "animate-glitch" : ""
                                }`
                                : "font-['Inter'] text-xl font-bold text-slate-800"
                        }
                    >
                        {dark
                            ? isEdit
                                ? "[ EDIT TASK ]"
                                : "[ NEW TASK ]"
                            : isEdit
                                ? "Edit Task"
                                : "New Task"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className={
                            dark
                                ? `font-mono text-xs border px-3 py-1 transition-colors ${
                                    isEdit
                                        ? "border-cyan-500/40 text-cyan-400 hover:border-fuchsia-400 hover:text-fuchsia-400"
                                        : "border-fuchsia-500/40 text-fuchsia-400 hover:border-cyan-400 hover:text-cyan-400"
                                }`
                                : "text-slate-400 hover:text-slate-600 text-xl leading-none px-2"
                        }
                    >
                        {dark ? "[ X ]" : "✕"}
                    </button>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor={uid + "title"} className={labelCls}>
                            {dark ? "// title" : "Title"}
                        </label>

                        <input
                            id={uid + "title"}
                            className={inputCls}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError("");
                            }}
                            placeholder={
                                isEdit
                                    ? undefined
                                    : dark
                                        ? "enter task title_"
                                        : "Task title"
                            }
                            autoFocus
                        />

                        {error && (
                            <p className="text-[#ff2d78] text-xs mt-1 font-mono">
                                {error}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor={uid + "description"}
                            className={labelCls}
                        >
                            {dark ? "// description" : "Description"}
                        </label>

                        <textarea
                            id={uid + "description"}
                            className={inputCls}
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={
                                isEdit
                                    ? undefined
                                    : dark
                                        ? "describe the task..."
                                        : "Optional description"
                            }
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div>
                        <label htmlFor={uid + "date"} className={labelCls}>
                            {dark
                                ? isEdit
                                    ? "// due date & time"
                                    : "// due date"
                                : isEdit
                                    ? "Due Date & Time"
                                    : "Due Date"}
                        </label>

                        <input
                            id={uid + "date"}
                            type="datetime-local"
                            className={inputCls}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            style={{
                                colorScheme: dark ? "dark" : "light",
                            }}
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label
                                htmlFor={uid + "status"}
                                className={labelCls}
                            >
                                {dark ? "// status" : "Status"}
                            </label>

                            <select
                                id={uid + "status"}
                                className={selectCls}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>
                                <option value="DONE">Done</option>
                                <option value="CANCELLED">
                                    Cancelled
                                </option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor={uid + "priority"}
                                className={labelCls}
                            >
                                {dark ? "// priority" : "Priority"}
                            </label>

                            <select
                                id={uid + "priority"}
                                className={selectCls}
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={
                            dark
                                ? `w-full py-3 mt-1 font-['VT323'] text-xl tracking-[0.15em] text-white border transition-all cursor-pointer disabled:opacity-50 ${
                                    isEdit
                                        ? "bg-cyan-700 hover:bg-cyan-600 border-cyan-400 shadow-[0_0_12px_#00ffff66]"
                                        : "bg-fuchsia-600 hover:bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_12px_#ff00ff66]"
                                }`
                                : "w-full py-3 mt-1 font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                        }
                    >
                        {isSubmitting
                            ? "SAVING..."
                            : dark
                                ? isEdit
                                    ? ">> SAVE CHANGES <<"
                                    : ">> ADD TO QUEUE <<"
                                : isEdit
                                    ? "Save Changes"
                                    : "Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
}