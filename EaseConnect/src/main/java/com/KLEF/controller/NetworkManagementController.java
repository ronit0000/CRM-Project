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

import com.KLEF.entity.NetworkDevice;
import com.KLEF.repository.NetworkDeviceRepository;

@RestController
@RequestMapping("/api/network")
@CrossOrigin(origins = "http://localhost:5173")
public class NetworkManagementController {

    @Autowired
    private NetworkDeviceRepository networkDeviceRepository;

    @GetMapping("/devices")
    public List<NetworkDevice> getAllDevices() {
        return networkDeviceRepository.findAll();
    }

    @GetMapping("/devices/online")
    public List<NetworkDevice> getOnlineDevices() {
        return networkDeviceRepository.findByStatus("Online");
    }

    @GetMapping("/devices/offline")
    public List<NetworkDevice> getOfflineDevices() {
        return networkDeviceRepository.findByStatus("Offline");
    }

    @PostMapping("/create")
    public NetworkDevice createDevice(@RequestBody NetworkDevice device) {
        return networkDeviceRepository.save(device);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<NetworkDevice> updateDevice(@PathVariable Long id, @RequestBody NetworkDevice updatedDevice) {
        return networkDeviceRepository.findById(id)
            .map(device -> {
                device.setDeviceName(updatedDevice.getDeviceName());
                device.setIpAddress(updatedDevice.getIpAddress());
                device.setStatus(updatedDevice.getStatus());
                NetworkDevice savedDevice = networkDeviceRepository.save(device);
                return ResponseEntity.ok(savedDevice);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        if (networkDeviceRepository.existsById(id)) {
            networkDeviceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}