package com.phillipspharmacy.medicare.model;

import lombok.Data;

@Data
public class OrderItem {
    private Long id;
    private Integer qty;
    // Getters and Setters

    // public int getQty() {
    //     return qty;
    // }

    // public void setQty(int qty) {
    //     this.qty = qty;
    // }

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }
}