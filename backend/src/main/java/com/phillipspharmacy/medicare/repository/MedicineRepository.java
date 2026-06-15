package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.time.LocalDate;


@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    
    // 1. Expiry Tracker: Finds medicines expiring between two dates
    List<Medicine> findByExpdateBetween(LocalDate start, LocalDate end);

    // 3. Low Stock Tracker: Threshold is passed from controller
    List<Medicine> findByQuantityLessThan(Integer threshold);

    // Count medicines where expdate is between today and 30 days from now
    Long countByExpdateBetween(LocalDate start, LocalDate end);

    // Search by medicine name or commercial name (case-insensitive)
    List<Medicine> findByMedicinenameContainingIgnoreCaseOrCommercialnameContainingIgnoreCase(String medicinename, String commercialname);

    // Filter by medicine type (case-insensitive)
    List<Medicine> findByMedicinetypeIgnoreCase(String type);

    // Filter by price range
    List<Medicine> findByPriceGreaterThanEqual(Float minPrice);
    List<Medicine> findByPriceLessThanEqual(Float maxPrice);

    // Filter by stock level
    List<Medicine> findByQuantityGreaterThanEqual(Integer minStock);
}