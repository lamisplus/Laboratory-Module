package org.lamisplus.modules.Laboratory.domain.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TestDTO {
    private Integer id;
    private String uuid;
    private Integer patientId;
    private Integer labTestId;
    private String description;
    private String clinicalNote;
    private String labNumber;
    private Integer labTestGroupId;
    private Integer orderPriority;
    //private String unitMeasurement;
    private Integer labTestOrderStatus;
    private Integer viralLoadIndication;
    private String patientUuid;
    private Long facilityId;
    private Integer labOrderId;
    private LocalDate orderedDate;
    private String labOrderIndication;
    private List<SampleResponseDTO> samples;
    private List<ResultDTO> results;
}
