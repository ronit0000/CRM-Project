package com.KLEF.repository;

import com.KLEF.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByStatus(String status);
    
    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.status = :status")
    Double sumAmountByStatus(String status);
    
    Long countByStatus(String status);
}