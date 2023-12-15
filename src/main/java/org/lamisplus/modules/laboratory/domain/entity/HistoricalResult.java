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
public class HistoricalResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "order_id")
    private Integer OrderId;
    @Column(name = "patient_id")
    private Integer PatientId;
    @Column(name = "lab_test_name")
    private String LabTestName;
    @Column(name = "group_name")
    private String GroupName;
    @Column(name = "order_date")
    private LocalDateTime OrderDate;
    @Column(name = "date_sample_collected")
    private LocalDateTime DateSampleCollected;
    @Column(name = "date_sample_verified")
    private LocalDateTime DateSampleVerified;
    @Column(name = "date_result_reported")
    private LocalDateTime DateResultReported;
    @Column(name = "result_reported")
    private String ResultReported;
}
