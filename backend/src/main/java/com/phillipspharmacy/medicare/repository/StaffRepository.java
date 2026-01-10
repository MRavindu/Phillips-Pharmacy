package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUnameAndIsDeleted(String uname, Integer isDeleted);
}