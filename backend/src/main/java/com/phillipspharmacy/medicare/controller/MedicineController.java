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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
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
        // Updated method call
        return medicineRepository.findByQuantityLessThan(10);
    }

    @GetMapping("/expiry-count")
    public Long getExpiryCount() {
        LocalDate today = LocalDate.now();
        LocalDate nextMonth = today.plusDays(30);
        return medicineRepository.countByExpdateBetween(today, nextMonth);
    }

    @GetMapping("/expiring-soon")
    public List<Medicine> getExpiringSoon() {
        LocalDate today = LocalDate.now();
        LocalDate nextMonth = today.plusDays(30);
        return medicineRepository.findByExpdateBetween(today, nextMonth);
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicines(@RequestParam("query") String query) {
        return medicineRepository.findByMedicinenameContainingIgnoreCaseOrCommercialnameContainingIgnoreCase(query, query);
    }

    @GetMapping("/filter")
    public List<Medicine> filterMedicines(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "minPrice", required = false) Float minPrice,
            @RequestParam(value = "maxPrice", required = false) Float maxPrice,
            @RequestParam(value = "minStock", required = false) Integer minStock) {
        
        if (type != null && !type.isEmpty()) {
            return medicineRepository.findByMedicinetypeIgnoreCase(type);
        }
        if (minPrice != null) {
            return medicineRepository.findByPriceGreaterThanEqual(minPrice);
        }
        if (maxPrice != null) {
            return medicineRepository.findByPriceLessThanEqual(maxPrice);
        }
        if (minStock != null) {
            return medicineRepository.findByQuantityGreaterThanEqual(minStock);
        }
        return medicineRepository.findAll();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getInventoryStats() {
        LocalDate today = LocalDate.now();
        LocalDate nextMonth = today.plusDays(30);
        
        long totalMedicines = medicineRepository.count();
        long lowStockCount = medicineRepository.findByQuantityLessThan(10).size();
        long expiringSoonCount = medicineRepository.countByExpdateBetween(today, nextMonth);
        
        return ResponseEntity.ok(Map.of(
            "totalMedicines", totalMedicines,
            "lowStockCount", lowStockCount,
            "expiringSoonCount", expiringSoonCount
        ));
    }

    @PutMapping("/update/{id}")
    public Medicine updateMedicine(@PathVariable Integer id, @RequestBody Medicine details) {
        Medicine med = medicineRepository.findById(id.longValue()).orElseThrow();

        // Updated to use new field names
        med.setMedicinename(details.getMedicinename());
        med.setCommercialname(details.getCommercialname());
        med.setStrength(details.getStrength());
        med.setMedicinetype(details.getMedicinetype());
        med.setQuantity(details.getQuantity());
        med.setPrice(details.getPrice());
        med.setExpdate(details.getExpdate());
        med.setDescription(details.getDescription());

        return medicineRepository.save(med);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMedicine(@PathVariable Integer id) {
        medicineRepository.deleteById(id.longValue());
    }

    @PostMapping("/checkout")
    @Transactional
    public ResponseEntity<?> finalizeOrder(@RequestBody List<OrderItem> cart) {
        Sale sale = new Sale();
        List<SaleItem> saleItems = new ArrayList<>();
        double total = 0;

        for (OrderItem item : cart) {
            // Find by Integer ID
            Medicine med = medicineRepository.findById(item.getId().longValue()).orElseThrow();

            // 1. Reduce Stock using 'quantity'
            med.setQuantity(med.getQuantity() - item.getQty());
            medicineRepository.save(med);

            // 2. Prepare Sale Item using updated field names
            SaleItem si = new SaleItem();
            si.setMedicineName(med.getMedicinename());
            si.setQuantity(item.getQty());
            si.setPriceAtSale(med.getPrice().doubleValue());
            saleItems.add(si);

            total += med.getPrice() * item.getQty();
        }

        sale.setItems(saleItems);
        sale.setTotalAmount(total);
        sale.setSaleDate(LocalDateTime.now());
        sale.setPaymentMethod("Cash");
        saleRepository.save(sale);

        return ResponseEntity.ok("Sale recorded and stock updated.");
    }
}