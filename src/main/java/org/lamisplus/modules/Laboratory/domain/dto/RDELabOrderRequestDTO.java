package org.lamisplus.modules.laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RDELabOrderRequestDTO {
    private Integer id;
    private Integer orderId;
    private Integer visitId;
    private Integer patientId;
    private Integer labTestGroupId;
    private Integer labTestId;
    private String labNumber;
    private String sampleNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sampleCollectionDate;
    private String sampleCollectedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateResultReceived;
    private String result;
    private String resultReportedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateResultReported;
    private String checkedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateChecked;
    private String comments;
    private String clinicianName;
    private Integer viralLoadIndication;
    private Integer sampleTypeId;
    private String pcrLabName;
    private String pcrLabSampleNumber;
    private Integer sampleLoggedRemotely;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateSampleLoggedRemotely;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateReceivedAtPcrLab;
    private String orderBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOrderBy;
    private String assayedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateAssayedBy;
    private String approvedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateApproved;
}
