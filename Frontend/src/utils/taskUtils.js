export function formatDate(d) {
    if (!d) return null;

    const date = new Date(d);

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function isOverdue(dueDate, status) {
    if (
        !dueDate ||
        status === "DONE" ||
        status === "CANCELLED"
    ) {
        return false;
    }

    return new Date(dueDate) < new Date();
}