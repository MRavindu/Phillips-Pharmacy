package com.phillipspharmacy.medicare.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Entity
@Table(name = "sales")
@Data
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime saleDate;
    private Double totalAmount;
    private String paymentMethod; // Cash, Card, or Online

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "sale_id")
    private List<SaleItem> items;
}