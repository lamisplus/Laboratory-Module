package org.lamisplus.modules.laboratory.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "order_id")
    private Integer orderId;
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    @Column(name = "test_orders")
    private Integer testOrders;
    @Column(name = "collected_samples")
    private Integer collectedSamples;
    @Column(name = "verified_samples")
    private Integer verifiedSamples;
    @Column(name = "reported_results")
    private Integer reportedResults;
    @Column(name = "patient_id")
    private Integer patientId;
}
