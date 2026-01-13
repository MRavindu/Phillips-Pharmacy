package com.phillipspharmacy.medicare.controller;

import com.phillipspharmacy.medicare.model.Medicine;
import com.phillipspharmacy.medicare.model.OrderItem;
import com.phillipspharmacy.medicare.model.Sale;
import com.phillipspharmacy.medicare.model.SaleItem;
import com.phillipspharmacy.medicare.repository.MedicineRepository;
import com.phillipspharmacy.medicare.repository.SaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173") // Allow React to access
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private SaleRepository saleRepository;

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @PostMapping("/add")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @GetMapping("/low-stock")
    public List<Medicine> getLowStock() {
        return medicineRepository.findByStockQuantityLessThan(10); // Threshold of 10
    }

    @PutMapping("/update/{id}")
    public Medicine updateMedicine(@PathVariable Long id, @RequestBody Medicine details) {
        Medicine med = medicineRepository.findById(id).orElseThrow();
        med.setName(details.getName());
        med.setStockQuantity(details.getStockQuantity());
        med.setUnitPrice(details.getUnitPrice());
        return medicineRepository.save(med);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineRepository.deleteById(id);
    }

    @PostMapping("/checkout")
@Transactional
public ResponseEntity<?> finalizeOrder(@RequestBody List<OrderItem> cart) {
    Sale sale = new Sale();
    List<SaleItem> saleItems = new ArrayList<>();
    double total = 0;

    for (OrderItem item : cart) {
        Medicine med = medicineRepository.findById(item.getId()).orElseThrow();
        
        // 1. Reduce Stock
        med.setStockQuantity(med.getStockQuantity() - item.getQty());
        medicineRepository.save(med);

        // 2. Prepare Sale Item
        SaleItem si = new SaleItem();
        si.setMedicineName(med.getName());
        si.setQuantity(item.getQty());
        si.setPriceAtSale(med.getUnitPrice());
        saleItems.add(si);

        total += med.getUnitPrice() * item.getQty();
    }

    // 3. Save the Transaction Record
    sale.setItems(saleItems);
    sale.setTotalAmount(total);
    sale.setSaleDate(LocalDateTime.now());
    sale.setPaymentMethod("Cash"); // Default for POS
    saleRepository.save(sale);

    return ResponseEntity.ok("Sale recorded and stock updated.");
}

}