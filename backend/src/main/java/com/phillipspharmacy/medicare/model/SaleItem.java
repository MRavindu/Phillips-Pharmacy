package com.phillipspharmacy.medicare.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;
    private Integer quantity;
    private Double priceAtSale; // Price might change over time, so we store it here
}