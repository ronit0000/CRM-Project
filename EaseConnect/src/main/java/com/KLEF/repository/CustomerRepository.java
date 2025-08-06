package com.KLEF.repository;

import com.KLEF.Customer; // Updated package
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    long countByStatus(String status);

    @Query("SELECT c.plan, COUNT(c) FROM Customer c GROUP BY c.plan")
    List<Object[]> countByPlan();
}