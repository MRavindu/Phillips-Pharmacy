package com.phillipspharmacy.medicare.controller;

import com.phillipspharmacy.medicare.model.Staff;
import com.phillipspharmacy.medicare.model.Role;
import com.phillipspharmacy.medicare.repository.StaffRepository;
import com.phillipspharmacy.medicare.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ==================== USER MANAGEMENT ====================

    @GetMapping("/staff")
    public ResponseEntity<?> getAllStaff() {
        List<Staff> staffList = staffRepository.findAll();
        return ResponseEntity.ok(staffList);
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id).orElse(null);
        if (staff == null) {
            return ResponseEntity.status(404).body("Staff not found");
        }
        return ResponseEntity.ok(staff);
    }

    @PostMapping("/staff/create")
    public ResponseEntity<?> createStaff(@RequestBody Map<String, Object> payload) {
        try {
            Staff staff = new Staff();
            staff.setSnic((String) payload.get("snic"));
            staff.setSname((String) payload.get("sname"));
            staff.setSemail((String) payload.get("semail"));
            staff.setStelno((String) payload.get("stelno"));
            staff.setUname((String) payload.get("uname"));
            staff.setUpswrd(passwordEncoder.encode((String) payload.get("upswrd")));

            Integer roleId = Integer.parseInt(payload.get("roleId").toString());
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            staff.setRole(role);

            staff.setIsDeleted(0); // Active by default

            Staff savedStaff = staffRepository.save(staff);
            return ResponseEntity.ok(savedStaff);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating staff: " + e.getMessage());
        }
    }

    @PutMapping("/staff/update/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Staff staff = staffRepository.findById(id).orElse(null);
            if (staff == null) {
                return ResponseEntity.status(404).body("Staff not found");
            }

            if (payload.containsKey("sname")) {
                staff.setSname((String) payload.get("sname"));
            }
            if (payload.containsKey("snic")) {
                staff.setSnic((String) payload.get("snic"));
            }
            if (payload.containsKey("semail")) {
                staff.setSemail((String) payload.get("semail"));
            }
            if (payload.containsKey("stelno")) {
                staff.setStelno((String) payload.get("stelno"));
            }
            if (payload.containsKey("uname")) {
                staff.setUname((String) payload.get("uname"));
            }
            if (payload.containsKey("upswrd") && !((String) payload.get("upswrd")).isEmpty()) {
                staff.setUpswrd(passwordEncoder.encode((String) payload.get("upswrd")));
            }
            if (payload.containsKey("roleId")) {
                Integer roleId = Integer.parseInt(payload.get("roleId").toString());
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new RuntimeException("Role not found"));
                staff.setRole(role);
            }

            Staff updatedStaff = staffRepository.save(staff);
            return ResponseEntity.ok(updatedStaff);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating staff: " + e.getMessage());
        }
    }

    @PutMapping("/staff/deactivate/{id}")
    public ResponseEntity<?> deactivateStaff(@PathVariable Long id) {
        try {
            Staff staff = staffRepository.findById(id).orElse(null);
            if (staff == null) {
                return ResponseEntity.status(404).body("Staff not found");
            }
            staff.setIsDeleted(1); // Soft delete - deactivate
            staffRepository.save(staff);
            return ResponseEntity.ok("Staff deactivated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deactivating staff: " + e.getMessage());
        }
    }

    @PutMapping("/staff/activate/{id}")
    public ResponseEntity<?> activateStaff(@PathVariable Long id) {
        try {
            Staff staff = staffRepository.findById(id).orElse(null);
            if (staff == null) {
                return ResponseEntity.status(404).body("Staff not found");
            }
            staff.setIsDeleted(0); // Activate
            staffRepository.save(staff);
            return ResponseEntity.ok("Staff activated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error activating staff: " + e.getMessage());
        }
    }

    @DeleteMapping("/staff/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            Staff staff = staffRepository.findById(id).orElse(null);
            if (staff == null) {
                return ResponseEntity.status(404).body("Staff not found");
            }
            staffRepository.delete(staff);
            return ResponseEntity.ok("Staff deleted permanently");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting staff: " + e.getMessage());
        }
    }

    // ==================== ROLE MANAGEMENT ====================

    @GetMapping("/roles")
    public ResponseEntity<?> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable Integer id) {
        Role role = roleRepository.findById(id).orElse(null);
        if (role == null) {
            return ResponseEntity.status(404).body("Role not found");
        }
        return ResponseEntity.ok(role);
    }

    @PostMapping("/roles/create")
    public ResponseEntity<?> createRole(@RequestBody Map<String, String> payload) {
        try {
            Role role = new Role();
            role.setRoleName(payload.get("roleName"));
            Role savedRole = roleRepository.save(role);
            return ResponseEntity.ok(savedRole);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating role: " + e.getMessage());
        }
    }

    @PutMapping("/roles/update/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Integer id, @RequestBody Map<String, String> payload) {
        try {
            Role role = roleRepository.findById(id).orElse(null);
            if (role == null) {
                return ResponseEntity.status(404).body("Role not found");
            }
            role.setRoleName(payload.get("roleName"));
            Role updatedRole = roleRepository.save(role);
            return ResponseEntity.ok(updatedRole);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating role: " + e.getMessage());
        }
    }

    @DeleteMapping("/roles/delete/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Integer id) {
        try {
            Role role = roleRepository.findById(id).orElse(null);
            if (role == null) {
                return ResponseEntity.status(404).body("Role not found");
            }
            // Check if role is assigned to any staff
            List<Staff> staffWithRole = staffRepository.findAll().stream()
                    .filter(s -> s.getRole() != null && s.getRole().getRoleId().equals(id))
                    .toList();
            
            if (!staffWithRole.isEmpty()) {
                return ResponseEntity.badRequest().body("Cannot delete role: assigned to " + staffWithRole.size() + " staff members");
            }
            
            roleRepository.delete(role);
            return ResponseEntity.ok("Role deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting role: " + e.getMessage());
        }
    }
}
