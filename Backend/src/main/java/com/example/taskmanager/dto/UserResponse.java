package com.example.taskmanager.dto;

public record UserResponse(
        Long id,
        String name,
        String email,
        String avatar) {
}