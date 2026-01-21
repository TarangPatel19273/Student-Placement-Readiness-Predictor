package com.StudentReadiness.demo.controller;

import com.StudentReadiness.demo.model.Student;
import com.StudentReadiness.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody Student student, Principal principal) {
        student.setUserId(principal.getName());
        return ResponseEntity.ok(studentService.saveStudent(student));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudents(Principal principal) {
        return ResponseEntity.ok(studentService.getStudentsByUserId(principal.getName()));
    }
}