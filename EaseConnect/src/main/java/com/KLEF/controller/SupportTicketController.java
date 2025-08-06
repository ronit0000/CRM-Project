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

import com.KLEF.entity.SupportTicket;
import com.KLEF.repository.SupportTicketRepository;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class SupportTicketController {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @GetMapping("/open")
    public List<SupportTicket> getOpenTickets() {
        return supportTicketRepository.findByStatus("Open");
    }

    @GetMapping("/closed")
    public List<SupportTicket> getClosedTickets() {
        return supportTicketRepository.findByStatus("Closed");
    }

    @GetMapping("/escalations")
    public List<SupportTicket> getEscalatedTickets() {
        return supportTicketRepository.findByStatus("Escalated");
    }

    @PostMapping("/create")
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SupportTicket> updateTicket(@PathVariable Long id, @RequestBody SupportTicket updatedTicket) {
        return supportTicketRepository.findById(id)
            .map(ticket -> {
                ticket.setCustomerName(updatedTicket.getCustomerName());
                ticket.setIssue(updatedTicket.getIssue());
                ticket.setStatus(updatedTicket.getStatus());
                SupportTicket savedTicket = supportTicketRepository.save(ticket);
                return ResponseEntity.ok(savedTicket);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        if (supportTicketRepository.existsById(id)) {
            supportTicketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}