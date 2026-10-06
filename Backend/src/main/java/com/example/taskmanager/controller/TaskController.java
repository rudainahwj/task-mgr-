package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.taskmanager.dto.CreateTaskRequest;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestBody CreateTaskRequest request,
            Authentication authentication) {

        Task task = new Task();
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setStatus(request.status());
        task.setPriority(request.priority());

        return ResponseEntity.ok(
                taskService.createTask(task, authentication.getName())
        );
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            Authentication authentication) {

        return ResponseEntity.ok(
                taskService.getAllTasks(authentication.getName())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(
            @PathVariable Long id,
            Authentication authentication) {

        return taskService.getTask(id, authentication.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Long id,
            @RequestBody Map<String, TaskStatus> body,
            Authentication authentication
    ) {
        TaskStatus status = body.get("status");
        Task updatedTask = taskService.updateTaskStatus(id, status, authentication.getName());

        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task,
            Authentication authentication
    ) {
        Task updatedTask = taskService.updateTask(id, task, authentication.getName());
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Authentication authentication) {

        taskService.deleteTask(id, authentication.getName());

        return ResponseEntity.noContent().build();
    }
}