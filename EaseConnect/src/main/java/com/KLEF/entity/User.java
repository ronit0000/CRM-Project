package com.KLEF.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Marks this class as a JPA entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing ID
    private Long id;

    private String name; // User’s name
    private String role; // User’s role (e.g., "Admin", "User")
    private String status; // User’s status (e.g., "ACTIVE", "INACTIVE")

    // Default constructor (required by JPA)
    public User() {}

    // Parameterized constructor (optional, for convenience)
    public User(String name, String role, String status) {
        this.name = name;
        this.role = role;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}