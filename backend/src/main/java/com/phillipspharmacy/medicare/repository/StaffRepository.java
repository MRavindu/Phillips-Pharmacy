package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    // This matches the Java field 'isDeleted'
    Optional<Staff> findByUnameAndIsDeleted(String uname, Integer isDeleted);
}