package com.StudentReadiness.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/predict")
@CrossOrigin(origins = "*")
public class PredictController {
    private final String ML_API_URL = "http://localhost:5000/predict";

    @PostMapping
    public ResponseEntity<?> predict(@RequestBody Map<String, Object> features) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(ML_API_URL, features, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}