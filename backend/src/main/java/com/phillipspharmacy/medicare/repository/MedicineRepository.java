package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.time.LocalDate;


@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    
    // 1. Expiry Tracker: Finds medicines expiring between two dates
    List<Medicine> findByExpiryDateBetween(LocalDate start, LocalDate end);

    // 3. Low Stock Tracker: Threshold is passed from controller
    List<Medicine> findByStockQuantityLessThan(Integer threshold);
}