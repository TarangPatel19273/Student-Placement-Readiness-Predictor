package com.StudentReadiness.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String studentId;
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    private String phone;
    private String department;
    private Integer year;
    private Double cgpa;
    private Integer dsaRating;
    private Integer projects;
    private Boolean internship;
    private Double attendance;
    private Double aptitude;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(columnDefinition = "TEXT")
    private String professionalLinks;

    public Student() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    
    public Integer getDsaRating() { return dsaRating; }
    public void setDsaRating(Integer dsaRating) { this.dsaRating = dsaRating; }
    
    public Integer getProjects() { return projects; }
    public void setProjects(Integer projects) { this.projects = projects; }
    
    public Boolean getInternship() { return internship; }
    public void setInternship(Boolean internship) { this.internship = internship; }
    
    public Double getAttendance() { return attendance; }
    public void setAttendance(Double attendance) { this.attendance = attendance; }
    
    public Double getAptitude() { return aptitude; }
    public void setAptitude(Double aptitude) { this.aptitude = aptitude; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getProfessionalLinks() { return professionalLinks; }
    public void setProfessionalLinks(String professionalLinks) { this.professionalLinks = professionalLinks; }
}