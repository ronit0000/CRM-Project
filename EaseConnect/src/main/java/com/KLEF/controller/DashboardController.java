package com.KLEF.controller;

import com.KLEF.repository.CustomerRepository;
import com.KLEF.repository.InvoiceRepository;
import com.KLEF.repository.NetworkDeviceRepository;
import com.KLEF.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private CustomerRepository customerRepo;
    @Autowired
    private InvoiceRepository invoiceRepo;
    @Autowired
    private NetworkDeviceRepository deviceRepo;
    @Autowired
    private SupportTicketRepository ticketRepo;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Customer Stats
        stats.put("activeCustomers", customerRepo.countByStatus("Active"));
        stats.put("inactiveCustomers", customerRepo.countByStatus("Inactive"));

        // Billing Stats
        stats.put("totalRevenue", invoiceRepo.sumAmountByStatus("Paid") != null ? 
                invoiceRepo.sumAmountByStatus("Paid") : 0.0);
        stats.put("pendingInvoices", invoiceRepo.countByStatus("Pending"));

        // Network Stats
        stats.put("onlineDevices", deviceRepo.countByStatus("Online"));
        stats.put("offlineDevices", deviceRepo.countByStatus("Offline"));

        // Support Stats (only open tickets for now)
        stats.put("openTickets", ticketRepo.countByStatus("Open"));

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/ticket-status")
    public ResponseEntity<Map<String, Object>> getTicketStatus() {
        Map<String, Object> data = new HashMap<>();
        data.put("labels", new String[]{"Open", "Closed", "Escalated"});
        data.put("data", new Long[]{
            ticketRepo.countByStatus("Open"),
            ticketRepo.countByStatus("Closed"),
            ticketRepo.countByStatus("Escalated")
        });
        return ResponseEntity.ok(data);
    }
}