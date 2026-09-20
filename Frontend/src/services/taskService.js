const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {
    const res = await fetch(API_BASE_URL);

    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return res.json();
}

export async function createTask(taskData) {
    const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    if (!res.ok) {
        throw new Error("Failed to create task");
    }

    return res.json();
}

export async function updateTask(id, taskData) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    if (!res.ok) {
        throw new Error("Failed to update task");
    }

    return res.json();
}

export async function updateTaskStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        throw new Error("Failed to update task status");
    }

    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete task");
    }
}