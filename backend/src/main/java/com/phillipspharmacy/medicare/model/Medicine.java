package com.phillipspharmacy.medicare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "medicine")
@Data 
public class Medicine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicineid; // Changed to Integer to match INT in SQL

    @Column(nullable = false, length = 100)
    private String medicinename;

    @Column(nullable = false, length = 100)
    private String commercialname;

    @Column(nullable = false, length = 10)
    private String strength;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false, length = 10)
    private String medicinetype;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Float price; // Matches FLOAT in SQL

    @Column(nullable = false)
    private LocalDate expdate; // Matches DATE in SQL

    @Column(nullable = false, unique = true)
    private Integer batchno;
}