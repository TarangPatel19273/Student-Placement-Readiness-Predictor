package com.StudentReadiness.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private double cgpa;
    private int dsaRating;
    private int projects;
    private boolean internship;
    private double attendance;
    private double aptitude;
    private String userId;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }
    public int getDsaRating() { return dsaRating; }
    public void setDsaRating(int dsaRating) { this.dsaRating = dsaRating; }
    public int getProjects() { return projects; }
    public void setProjects(int projects) { this.projects = projects; }
    public boolean isInternship() { return internship; }
    public void setInternship(boolean internship) { this.internship = internship; }
    public double getAttendance() { return attendance; }
    public void setAttendance(double attendance) { this.attendance = attendance; }
    public double getAptitude() { return aptitude; }
    public void setAptitude(double aptitude) { this.aptitude = aptitude; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}