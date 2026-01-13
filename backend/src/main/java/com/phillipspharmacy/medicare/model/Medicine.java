package com.phillipspharmacy.medicare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "medicines")
@Data // Generates Getters, Setters, ToString
public class Medicine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String brand;
    private String category; // e.g., Antibiotics, Painkillers
    
    private Integer stockQuantity;
    private Double unitPrice;
    
    private LocalDate expiryDate;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}