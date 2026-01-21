package com.StudentReadiness.demo.service;

import com.StudentReadiness.demo.model.Student;
import com.StudentReadiness.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getStudentsByUserId(String userId) {
        return studentRepository.findByUserId(userId);
    }
}