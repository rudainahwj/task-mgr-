import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard.jsx";
import TaskModal from "./components/TaskModal";
import {
    getTasks,
    createTask,
    updateTask as updateTaskApi,
    updateTaskStatus,
    deleteTask as deleteTaskApi,
} from "./services/taskService";
import { PRIORITY_ORDER } from "./constants/taskConstants";





// Stars for Y2K dark background
const STARS = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: `${(Math.random() * 4 + 2).toFixed(1)}s`,
    delay: `${(Math.random() * 4).toFixed(1)}s`,
}));



export default function App() {
    const [theme, setTheme] = useState("dark");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [search, setSearch] = useState("");


    const dark = theme === "dark";



    const fetchTasks = async () => {
        try {
            setLoading(true);

            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error("Failed to fetch tasks from server:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (newTaskData) => {
        const savedTask = await createTask(newTaskData);

        setTasks((prev) => [savedTask, ...prev]);

        setFilterStatus("all");
        setFilterPriority("all");
        setSearch("");
    };

    const updateTask = async (id, updatedTaskData) => {
        const updatedTask = await updateTaskApi(id, updatedTaskData);

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? updatedTask : task
            )
        );
    };

    const updateStatus = async (id, status) => {
        try {
            const updatedTask = await updateTaskStatus(id, status);

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );
        } catch (err) {
            console.error("Failed to update task status:", err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskApi(id);

            setTasks((prev) =>
                prev.filter((task) => task.id !== id)
            );
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    };

    const filtered = tasks.filter((t) => {
        if (filterStatus !== "all" && t.status !== filterStatus) return false;
        if (filterPriority !== "all" && t.priority !== filterPriority) return false;
        if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description?.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });


    const sortedTasks = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case "due-soonest":
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;

                return new Date(a.dueDate) - new Date(b.dueDate);

            case "due-latest":
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;

                return new Date(b.dueDate) - new Date(a.dueDate);

            case "priority-high":
                return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];

            case "priority-low":
                return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];

            default:
                return 0;
        }
    });

    const counts = {
        PENDING: tasks.filter((t) => t.status === "PENDING").length,
        IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        DONE: tasks.filter((t) => t.status === "DONE").length,
        CANCELLED: tasks.filter((t) => t.status === "CANCELLED").length,
    };

    const inputCls = dark
        ? "px-3 py-2 text-sm font-mono bg-[#0d0020] border border-fuchsia-500/50 text-fuchsia-100 placeholder-fuchsia-900 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_8px_#ff00ff66] transition-shadow"
        : "px-3 py-2 text-sm bg-white border border-slate-200 text-slate-800 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition";

    return (
        <div className={`min-h-full relative ${dark ? "bg-[#0a000f] text-fuchsia-100 dark-scanlines" : "bg-slate-50 text-slate-800"}`}>

            {dark && STARS.map((s) => (
                <div
                    key={s.id}
                    className="fixed rounded-full bg-white animate-twinkle pointer-events-none"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        animationDuration: s.duration,
                        animationDelay: s.delay,
                    }}
                />
            ))}

            {showModal && <TaskModal mode="add" dark={dark} onClose={() => setShowModal(false)} onSubmit={addTask} />}
            {editingTask && (<TaskModal mode="edit" task={editingTask} dark={dark} onClose={() => setEditingTask(null)} onSubmit={updateTask}/>)}

            <header className={`sticky top-0 z-40 backdrop-blur-md ${
                dark
                    ? "bg-[#0a000f]/90 border-b border-fuchsia-500/30 shadow-[0_2px_24px_#ff00ff11]"
                    : "bg-white/90 border-b border-slate-200 shadow-sm"
            }`}>
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {dark && <span className="text-fuchsia-400 text-lg">✦</span>}
                        <span className={dark
                            ? "font-['VT323'] text-2xl text-fuchsia-400 tracking-[0.18em] animate-glitch"
                            : "font-['Inter'] font-bold text-lg text-slate-800 tracking-tight"
                        }>
              {dark ? "TASK://MGR" : "TaskManager"}
            </span>
                    </div>
                    <button
                        onClick={() => setTheme(dark ? "light" : "dark")}
                        className={dark
                            ? "font-mono text-[11px] text-cyan-400 border border-cyan-500/40 px-3 py-1.5 hover:border-cyan-400 hover:shadow-[0_0_8px_#00ffff44] transition-all tracking-widest cursor-pointer"
                            : "text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-slate-300 hover:text-slate-700 transition-colors cursor-pointer"
                        }
                    >
                        {dark ? "☀ LIGHT" : "☾ NIGHT"}
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8 relative z-10">

                <div className="mb-7">
                    {dark ? (
                        <>
                            <p className="font-mono text-[11px] text-cyan-400 tracking-[0.22em] mb-1">
                                {">> SYSTEM ACTIVE // v2.0.26 <<"}
                            </p>
                            <h1 className="font-['VT323'] text-5xl text-fuchsia-100 tracking-[0.1em] animate-blink leading-none">
                                MY TASKS
                            </h1>
                        </>
                    ) : (
                        <h1 className="font-['Inter'] text-3xl font-bold text-slate-800 tracking-tight">
                            My Tasks
                        </h1>
                    )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                    {[
                        {
                            label: dark ? "[ PENDING ]" : "PENDING",
                            count: counts.PENDING,
                            color: dark ? "text-blue-300" : "text-blue-500"
                        },
                        {
                            label: dark ? "[ IN PROG ]" : "IN_PROGRESS",
                            count: counts.IN_PROGRESS,
                            color: dark ? "text-[#00ffcc]" : "text-emerald-500"
                        },
                        {
                            label: dark ? "[ DONE ]" : "DONE",
                            count: counts.DONE,
                            color: dark ? "text-[#00d68f]" : "text-green-500"
                        },
                        {
                            label: dark ? "[ CANCEL ]" : "CANCELLED",
                            count: counts.CANCELLED,
                            color: dark ? "text-zinc-500" : "text-zinc-400"
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`p-4 flex flex-col gap-1 ${
                                dark
                                    ? "bg-[#0f0018] border border-fuchsia-500/25"
                                    : "bg-white border border-slate-200 rounded-xl shadow-sm"
                            }`}
                        >
              <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${dark ? "text-fuchsia-500/60" : "text-slate-400"}`}>
                {stat.label}
              </span>
                            <span className={`font-['VT323'] text-4xl leading-none ${stat.color}`}>
                {stat.count.toString().padStart(2, "0")}
              </span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2.5 mb-6 items-center">
                    <input
                        className={`${inputCls} flex-1 min-w-44`}
                        placeholder={dark ? "search tasks..." : "Search tasks..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className={inputCls}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">{dark ? "ALL STATUS" : "All Status"}</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                    <select
                        className={inputCls}
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="all">{dark ? "ALL PRIORITY" : "All Priority"}</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <select
                        className={inputCls}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">
                            {dark ? "SORT BY" : "Sort By"}
                        </option>

                        <option value="due-soonest">
                            Due Date: Soonest
                        </option>

                        <option value="due-latest">
                            Due Date: Latest
                        </option>

                        <option value="priority-high">
                            Priority: High → Low
                        </option>

                        <option value="priority-low">
                            Priority: Low → High
                        </option>
                    </select>
                    <button
                        onClick={() => setShowModal(true)}
                        className={dark
                            ? "font-['VT323'] text-xl tracking-[0.12em] px-5 py-2 text-white bg-fuchsia-700 border border-fuchsia-400 hover:bg-fuchsia-600 shadow-[0_0_12px_#ff00ff55] hover:shadow-[0_0_20px_#ff00ff88] transition-all flex-shrink-0 cursor-pointer"
                            : "font-semibold text-sm px-5 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors flex-shrink-0 cursor-pointer"
                        }
                    >
                        {dark ? "+ NEW TASK" : "+ Add Task"}
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 font-['VT323'] text-2xl text-fuchsia-400 animate-pulse">
                        // LOADING TASKS FROM DATABASE... //
                    </div>
                ) : sortedTasks.length === 0 ? (
                    <div className={`flex flex-col items-center justify-center gap-3 py-20 ${
                        dark ? "border border-fuchsia-500/20 bg-[#0f0018]" : "border border-slate-200 bg-white rounded-2xl"
                    }`}>
            <span className={`font-['VT323'] text-3xl tracking-widest ${dark ? "text-fuchsia-500/40" : "text-slate-300"}`}>
              {dark ? "// NO TASKS FOUND //" : "No tasks found"}
            </span>
                        <span className={`font-mono text-xs ${dark ? "text-fuchsia-500/30" : "text-slate-400"}`}>
              {dark ? "add a new task or change filters_" : "Adjust your filters or add a new task."}
            </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                dark={dark}
                                onDelete={deleteTask}
                                onStatusChange={updateStatus}
                                onEdit={setEditingTask}
                            />
                        ))}
                    </div>
                )}

                <footer className={`mt-12 pt-4 text-center font-mono text-[11px] tracking-[0.1em] ${
                    dark
                        ? "border-t border-fuchsia-500/20 text-fuchsia-500/30"
                        : "border-t border-slate-200 text-slate-400"
                }`}>
                    {dark
                        ? `✦ TASK://MGR // ${tasks.length} TASKS LOADED // ${new Date().toLocaleDateString()} ✦`
                        : `TaskManager · ${tasks.length} total tasks · ${new Date().toLocaleDateString()}`
                    }
                </footer>
            </main>
        </div>
    );
}