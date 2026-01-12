package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    // This matches the Java field 'isDeleted'
    Optional<Staff> findByUnameAndIsDeleted(String uname, Integer isDeleted);
    // how to find a user by forgot password related token
    Optional<Staff> findByUname(String uname);
    Optional<Staff> findBySemail(String semail); // To find user by email for the reset link
    Optional<Staff> findByResetToken(String resetToken); // To find user when they click the link
}