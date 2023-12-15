package org.lamisplus.modules.laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SampleResponseDTO {
    private Integer id;
    private String SampleNumber;
    private Integer sampleTypeId;
    private String sampleTypeName;
    private Object sampleCollectionMode;
    private String labNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateSampleCollected;
    private String commentSampleCollected;
    private String sampleCollectedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime dateSampleVerified;
    public String commentSampleVerified;
    private String sampleVerifiedBy;
    private String sampleAccepted;
    public Integer testId;
    private Integer sampleLoggedRemotely;
    private LocalDate dateSampleLoggedRemotely;
}
