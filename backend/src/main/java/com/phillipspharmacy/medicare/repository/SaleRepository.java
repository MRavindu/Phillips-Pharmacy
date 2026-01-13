package com.phillipspharmacy.medicare.repository;

import com.phillipspharmacy.medicare.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    // Standard range query for custom date selection
    List<Sale> findBySaleDateBetween(LocalDateTime start, LocalDateTime end);

    // Optimized query to get total revenue directly from the DB
    @Query("SELECT SUM(s.totalAmount) FROM Sale s WHERE s.saleDate BETWEEN :start AND :end")
    Double getTotalRevenue(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}