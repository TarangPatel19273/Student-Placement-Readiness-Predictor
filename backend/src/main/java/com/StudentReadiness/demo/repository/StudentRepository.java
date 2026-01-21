package com.StudentReadiness.demo.repository;

import com.StudentReadiness.demo.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByUserId(String userId);
}