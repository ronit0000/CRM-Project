package com.KLEF.repository;

import com.KLEF.entity.NetworkDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NetworkDeviceRepository extends JpaRepository<NetworkDevice, Long> {
    List<NetworkDevice> findByStatus(String status);
    long countByStatus(String status);
}