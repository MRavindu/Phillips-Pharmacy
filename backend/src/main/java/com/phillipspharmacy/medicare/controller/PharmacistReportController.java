package com.phillipspharmacy.medicare.controller;


import com.phillipspharmacy.medicare.repository.SaleRepository;
import com.phillipspharmacy.medicare.model.Sale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;



@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacistReportController {

    @Autowired
    private SaleRepository saleRepository; // You'll need a Sale entity to track transactions

    @GetMapping("/sales")
    public List<Sale> getSalesReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime end) {
        return saleRepository.findBySaleDateBetween(start, end);
    }
}