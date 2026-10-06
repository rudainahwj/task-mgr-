package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public Task createTask(Task task, String email) {

        User user = getUserByEmail(email);

        task.setUser(user);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String email) {

        User user = getUserByEmail(email);

        return taskRepository.findByUserId(user.getId());
    }

    public Optional<Task> getTask(Long id, String email) {
        User user = getUserByEmail(email);
        return taskRepository.findByIdAndUserId(id, user.getId());
    }

    public Task updateTask(Long id, Task updateTask, String email) {

        User user = getUserByEmail(email);

        return taskRepository.findByIdAndUserId(id, user.getId())
                .map(task -> {
                    task.setTitle(updateTask.getTitle());
                    task.setDescription(updateTask.getDescription());
                    task.setDueDate(updateTask.getDueDate());
                    task.setStatus(updateTask.getStatus());
                    task.setPriority(updateTask.getPriority());

                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    public Task updateTaskStatus(Long id, TaskStatus status, String email) {

        User user = getUserByEmail(email);

        return taskRepository.findByIdAndUserId(id, user.getId())
                .map(task -> {
                    task.setStatus(status);
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    public void deleteTask(Long id, String email) {

        User user = getUserByEmail(email);

        Task task = taskRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        taskRepository.delete(task);
    }
}