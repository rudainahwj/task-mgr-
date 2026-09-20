package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public Optional<Task> getTask(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long id, Task updateTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(updateTask.getTitle());
            task.setDescription(updateTask.getDescription());
            task.setDueDate(updateTask.getDueDate());
            task.setStatus(updateTask.getStatus());
            task.setPriority(updateTask.getPriority());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task updateTaskStatus(Long id, TaskStatus status) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setStatus(status);
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

}
