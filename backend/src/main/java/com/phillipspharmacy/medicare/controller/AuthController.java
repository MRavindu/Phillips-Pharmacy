package com.phillipspharmacy.medicare.controller;

import com.phillipspharmacy.medicare.model.Staff;
import com.phillipspharmacy.medicare.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username").trim();
        String password = credentials.get("password");

        // FIND THE USER
        Staff user = staffRepository.findByUnameAndIsDeleted(username, 0).orElse(null);

        if (user != null) {
            String dbHash = user.getUpswrd().trim();
            boolean isMatch = passwordEncoder.matches(password, dbHash);

            if (isMatch) {
                return ResponseEntity.ok(user);
            } else {
                 return ResponseEntity.status(401).body("Invalid Password");
                // --- THE AUTO-FIXER ---
                //String newCorrectHash = passwordEncoder.encode(password);
                // System.out.println("CRITICAL: Mismatch detected. Your DB has a bad hash.");
                // System.out.println("PLEASE RUN THIS SQL IN DBEAVER TO FIX IT:");
                // System.out.println(
                        // "UPDATE staff SET upswrd = '" + newCorrectHash + "' WHERE uname = '" + username + "';");
                // return ResponseEntity.status(401).body("Mismatch - See Terminal for FIX SQL");
            }
        }
        return ResponseEntity.status(404).body("User Not Found");
    }
}