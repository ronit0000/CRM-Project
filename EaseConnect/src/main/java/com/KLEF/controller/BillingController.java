package com.KLEF.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KLEF.entity.Invoice;
import com.KLEF.repository.InvoiceRepository;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "http://localhost:5173")
public class BillingController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @GetMapping("/invoices/pending")
    public List<Invoice> getPendingInvoices() {
        return invoiceRepository.findByStatus("Pending");
    }

    @GetMapping("/invoices/paid")
    public List<Invoice> getPaidInvoices() {
        return invoiceRepository.findByStatus("Paid");
    }

    @PostMapping("/create")
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice updatedInvoice) {
        return invoiceRepository.findById(id)
            .map(invoice -> {
                invoice.setCustomerName(updatedInvoice.getCustomerName());
                invoice.setAmount(updatedInvoice.getAmount());
                invoice.setStatus(updatedInvoice.getStatus());
                Invoice savedInvoice = invoiceRepository.save(invoice);
                return ResponseEntity.ok(savedInvoice);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}