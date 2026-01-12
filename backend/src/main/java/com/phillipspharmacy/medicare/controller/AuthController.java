package com.phillipspharmacy.medicare.controller;

import com.phillipspharmacy.medicare.model.Staff;
import com.phillipspharmacy.medicare.model.Role;
import com.phillipspharmacy.medicare.repository.StaffRepository;
import com.phillipspharmacy.medicare.repository.RoleRepository;

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

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username").trim();
        String password = credentials.get("password");

        // Use the repository method that checks for the active user (is_deleted = 0)
        Staff user = staffRepository.findByUnameAndIsDeleted(username, 0).orElse(null);

        System.out.println("Login attempt: [" + username + "] - Found Active User: " + (user != null));

        if (user != null) {

             // @PostMapping("/login")
            // public ResponseEntity<?> login(@RequestBody Map<String, String> credentials)
            // {
            // String username = credentials.get("username").trim();
            // String password = credentials.get("password");

            // // FIND THE USER
            // Staff user = staffRepository.findByUnameAndIsDeleted(username,
            // 0).orElse(null);

            // //--- DEBUG LOGS ---
            // System.out.println("Attempting login for username: [" + username + "]");
            // // Check if the user exists at all without the isDeleted filter
            // boolean exists = staffRepository.findAll().stream()
            // .anyMatch(s -> s.getUname().equals(username));
            // System.out.println("Does username exist in DB at all? " + exists);
            // //--- DEBUG LOGS ---

            String dbHash = user.getUpswrd().trim();
            if (passwordEncoder.matches(password, dbHash)) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Invalid Password");

                // --- THE AUTO-FIXER ---
                // String newCorrectHash = passwordEncoder.encode(password);
                // System.out.println("CRITICAL: Mismatch detected. Your DB has a bad hash.");
                // System.out.println("PLEASE RUN THIS SQL IN DBEAVER TO FIX IT:");
                // System.out.println(
                // "UPDATE staff SET upswrd = '" + newCorrectHash + "' WHERE uname = '" +
                // username + "';");
                // return ResponseEntity.status(401).body("Mismatch - See Terminal for FIX
                // SQL");

            }
        }
        return ResponseEntity.status(404).body("User Not Found or Account Deactivated");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> payload) {
        try {
            Staff staff = new Staff();
            staff.setSname((String) payload.get("sname"));
            staff.setSnic((String) payload.get("snic"));
            staff.setSemail((String) payload.get("semail"));
            staff.setStelno((String) payload.get("stelno"));
            staff.setUname((String) payload.get("uname"));
            staff.setUpswrd(passwordEncoder.encode((String) payload.get("upswrd")));

            Integer roleId = Integer.parseInt(payload.get("roleId").toString());
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            staff.setRole(role);
            staff.setIsDeleted(0); // Set default to 0 (active)

            staffRepository.save(staff);
            return ResponseEntity.ok("Staff registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}