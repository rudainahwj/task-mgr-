package com.example.taskmanager.dto;

import com.example.taskmanager.model.TaskPriority;
import com.example.taskmanager.model.TaskStatus;

import java.time.LocalDateTime;

public record CreateTaskRequest(
        String title,
        String description,
        LocalDateTime dueDate,
        TaskStatus status,
        TaskPriority priority
) {
}