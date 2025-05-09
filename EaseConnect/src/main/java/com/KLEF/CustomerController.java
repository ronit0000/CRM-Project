package com.KLEF;
import com.KLEF.repository.*; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // Read all customers
    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // Create a new customer
    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    // Update an existing customer
    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        return customerRepository.findById(id)
            .map(customer -> {
                customer.setName(updatedCustomer.getName());
                customer.setEmail(updatedCustomer.getEmail());
                customer.setPlan(updatedCustomer.getPlan());
                customer.setStatus(updatedCustomer.getStatus());
                Customer savedCustomer = customerRepository.save(customer);
                return ResponseEntity.ok(savedCustomer);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a customer
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}