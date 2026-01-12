package com.phillipspharmacy.medicare.repository; // Fix this line!

import com.phillipspharmacy.medicare.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    // JpaRepository gives you findAll(), findById(), etc. automatically
}