package org.lamisplus.modules.Laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SampleDTO {
    private Integer id;
    private String SampleNumber;
    private Integer sampleTypeId;
    private Integer sampleCollectionMode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateSampleCollected;
    private String commentSampleCollected;
    private String sampleCollectedBy;
    public Integer testId;
    private Integer sampleLoggedRemotely;
    private LocalDate dateSampleLoggedRemotely;
}
