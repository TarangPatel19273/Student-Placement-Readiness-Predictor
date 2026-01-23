package com.StudentReadiness.demo.controller;

import com.StudentReadiness.demo.model.Student;
import com.StudentReadiness.demo.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    
    private final StudentRepository studentRepository;
    
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // 🔒 Test secured endpoint
    @GetMapping("/data")
    public String securedData(java.security.Principal principal) {
        String email = principal.getName();
        return "JWT verified successfully. Logged in user: " + email;
    }
    
    // Get student profile by email
    @GetMapping("/profile")
    public Map<String, Object> getProfile(java.security.Principal principal) {
        String email = principal.getName();
        Optional<Student> student = studentRepository.findByEmail(email);
        
        Map<String, Object> response = new HashMap<>();
        if (student.isPresent()) {
            response.put("success", true);
            response.put("data", student.get());
        } else {
            response.put("success", false);
            response.put("message", "Student profile not found");
        }
        return response;
    }
    
    // Create or update student profile
    @PostMapping("/profile")
    public Map<String, Object> saveProfile(@RequestBody Student student, java.security.Principal principal) {
        String email = principal.getName();
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Ensure email is set from authenticated user
            if (email == null || email.isEmpty()) {
                response.put("success", false);
                response.put("message", "Authentication error: Email not found");
                return response;
            }
            
            student.setEmail(email);
            
            Optional<Student> existingStudent = studentRepository.findByEmail(email);
            
            if (existingStudent.isPresent()) {
                // Update existing student
                Student existing = existingStudent.get();
                
                if (student.getName() != null && !student.getName().isEmpty()) {
                    existing.setName(student.getName());
                }
                if (student.getPhone() != null && !student.getPhone().isEmpty()) {
                    existing.setPhone(student.getPhone());
                }
                if (student.getDepartment() != null && !student.getDepartment().isEmpty()) {
                    existing.setDepartment(student.getDepartment());
                }
                if (student.getYear() != null) {
                    existing.setYear(student.getYear());
                }
                if (student.getCgpa() != null) {
                    existing.setCgpa(student.getCgpa());
                }
                if (student.getDsaRating() != null) {
                    existing.setDsaRating(student.getDsaRating());
                }
                if (student.getProjects() != null) {
                    existing.setProjects(student.getProjects());
                }
                if (student.getInternship() != null) {
                    existing.setInternship(student.getInternship());
                }
                if (student.getAttendance() != null) {
                    existing.setAttendance(student.getAttendance());
                }
                if (student.getAptitude() != null) {
                    existing.setAptitude(student.getAptitude());
                }
                if (student.getProfessionalLinks() != null && !student.getProfessionalLinks().isEmpty()) {
                    existing.setProfessionalLinks(student.getProfessionalLinks());
                }
                
                Student saved = studentRepository.save(existing);
                response.put("success", true);
                response.put("message", "Student profile updated successfully");
                response.put("data", saved);
            } else {
                // Create new student
                if (student.getStudentId() == null || student.getStudentId().isEmpty()) {
                    student.setStudentId("STU" + System.currentTimeMillis());
                }
                
                Student saved = studentRepository.save(student);
                response.put("success", true);
                response.put("message", "Student profile created successfully");
                response.put("data", saved);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Error saving student profile: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
        }
        
        return response;
    }
}
