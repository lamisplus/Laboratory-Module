package org.lamisplus.modules.laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OtherTestOrderRequestDTO {
    private Integer id;
    private Integer orderId;
    private Integer patientId;
    //private int visitId;
    private Integer labTestGroupId;
    private Integer labTestId;
    private String labNumber;
    private String sampleNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sampleCollectionDate;
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
    private String sampleCollectedBy;
}
