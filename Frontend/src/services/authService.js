const API_URL = "http://localhost:8080/api/auth";

function getCookie(name) {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((row) =>
        row.startsWith(`${name}=`)
    );

    return cookie
        ? decodeURIComponent(cookie.split("=")[1])
        : null;
}

export async function getCsrfToken() {
    await fetch("http://localhost:8080/api/auth/csrf", {
        method: "GET",
        credentials: "include"
    });

    return getCookie("XSRF-TOKEN");
}

export async function registerUser(name, email, password, avatar) {
    const csrfToken = await getCsrfToken();

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({
            name,
            email,
            password,
            avatar
        })
    });

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("This email is already registered.");
        }

        throw new Error("Could not create account.");
    }

    return response.json();
}

export async function loginUser(email, password) {
    const csrfToken = await getCsrfToken();
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
    }

    return response.json();
}

export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export async function logoutUser() {
    const csrfToken = await getCsrfToken();
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "X-XSRF-TOKEN": csrfToken
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
    }
}