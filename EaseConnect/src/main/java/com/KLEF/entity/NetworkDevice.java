package com.KLEF.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "network_devices")
public class NetworkDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deviceName;
    private String ipAddress;
    private String status; // "Online", "Offline", "Maintenance"

    // Constructors
    public NetworkDevice() {}
    public NetworkDevice(String deviceName, String ipAddress, String status) {
        this.deviceName = deviceName;
        this.ipAddress = ipAddress;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}