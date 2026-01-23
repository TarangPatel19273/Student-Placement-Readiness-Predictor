package com.StudentReadiness.demo.controller;

import com.StudentReadiness.demo.model.User;
import com.StudentReadiness.demo.service.JwtService;
import com.StudentReadiness.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        try {
            User savedUser = userService.signup(user);
            String token = jwtService.generateToken(savedUser.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return response;
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> data) {
        User user = userService.login(
                data.get("email"),
                data.get("password")
        );

        String token = jwtService.generateToken(user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }
}