import { getCsrfToken } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {
    const res = await fetch(API_BASE_URL, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    return res.json();
}

export async function createTask(taskData) {
    const csrfToken = await getCsrfToken();
    const res = await fetch(API_BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(taskData),
    });

    if (!res.ok) {
        throw new Error("Failed to create task");
    }

    return res.json();
}

export async function updateTask(id, taskData) {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(taskData),
    });

    if (!res.ok) {
        throw new Error("Failed to update task");
    }

    return res.json();
}

export async function updateTaskStatus(id, status) {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        throw new Error("Failed to update task status");
    }

    return res.json();
}

export async function deleteTask(id) {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrfToken
        },
    });

    if (!res.ok) {
        throw new Error("Failed to delete task");
    }
}