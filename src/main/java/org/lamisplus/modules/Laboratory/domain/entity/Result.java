package org.lamisplus.modules.Laboratory.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "laboratory_result")
public class Result extends Audit<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "assayed_by")
    private String assayedBy;
    @Column(name = "date_assayed")
    private LocalDateTime dateAssayed;
    @Column(name = "checked_by")
    private String checkedBy;
    @Column(name = "date_checked")
    private LocalDateTime dateChecked;
    @Column(name = "approved_by")
    private String approvedBy;
    @Column(name = "date_approved")
    private LocalDate dateApproved;
    @Column(name = "result_reported_by")
    private String resultReportedBy;
    @Column(name = "date_result_reported")
    private LocalDateTime dateResultReported;
    @Column(name = "result_reported")
    private String resultReported;
    @Column(name = "result_report")
    private String resultReport;
    @Column(name = "test_id")
    private Integer testId;
    @Column(name = "patient_uuid")
    private String patientUuid;
    @Column(name = "facility_id")
    private Long facilityId;
    @Column(name = "patient_id")
    private Integer patientId;
    @Column(name = "pcr_lab_sample_number")
    private String pcrLabSampleNumber;
    @Column(name = "date_sample_received_at_pcr_lab")
    private LocalDate dateSampleReceivedAtPcrLab;
    @Column(name = "date_result_received")
    private LocalDateTime dateResultReceived;
    @Column(name = "result_received_by")
    private String resultReceivedBy;
    @Column(name = "archived")
    private Integer archived;
    @Column(name = "pcr_lab_name")
    private String pcrLabName;
}
