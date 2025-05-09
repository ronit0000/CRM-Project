package com.KLEF.repository;

import com.KLEF.entity.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByStatus(String status);
    long countByStatus(String status);
}