package com.KLEF.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KLEF.Customer; // From com.KLEF
import com.KLEF.entity.Invoice;
import com.KLEF.entity.NetworkDevice;
import com.KLEF.entity.SupportTicket;
import com.KLEF.repository.CustomerRepository;
import com.KLEF.repository.InvoiceRepository;
import com.KLEF.repository.NetworkDeviceRepository;
import com.KLEF.repository.SupportTicketRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private NetworkDeviceRepository networkDeviceRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/customers")
    public ResponseEntity<Map<String, Object>> getCustomerReport() {
        List<Object[]> planCounts = customerRepository.countByPlan();
        long activeCustomers = customerRepository.countByStatus("Active");
        long inactiveCustomers = customerRepository.countByStatus("Inactive");

        Map<String, Object> report = new HashMap<>();
        report.put("totalCustomers", customerRepository.count());
        report.put("activeCustomers", activeCustomers);
        report.put("inactiveCustomers", inactiveCustomers);
        report.put("planBreakdown", planCounts);

        return ResponseEntity.ok(report);
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getRevenueReport() {
        Double totalRevenue = invoiceRepository.sumAmountByStatus("Paid") != null ? invoiceRepository.sumAmountByStatus("Paid") : 0.0;
        Double pendingRevenue = invoiceRepository.sumAmountByStatus("Pending") != null ? invoiceRepository.sumAmountByStatus("Pending") : 0.0;
        long pendingInvoicesCount = invoiceRepository.countByStatus("Pending");

        Map<String, Object> report = new HashMap<>();
        report.put("totalRevenue", totalRevenue);
        report.put("pendingRevenue", pendingRevenue);
        report.put("pendingInvoicesCount", pendingInvoicesCount);
        report.put("paidInvoicesCount", invoiceRepository.countByStatus("Paid"));

        return ResponseEntity.ok(report);
    }

    @GetMapping("/network")
    public ResponseEntity<Map<String, Object>> getNetworkReport() {
        long onlineDevices = networkDeviceRepository.countByStatus("Online");
        long offlineDevices = networkDeviceRepository.countByStatus("Offline");
        long maintenanceDevices = networkDeviceRepository.countByStatus("Maintenance");

        Map<String, Object> report = new HashMap<>();
        report.put("totalDevices", networkDeviceRepository.count());
        report.put("onlineDevices", onlineDevices);
        report.put("offlineDevices", offlineDevices);
        report.put("maintenanceDevices", maintenanceDevices);

        return ResponseEntity.ok(report);
    }
}