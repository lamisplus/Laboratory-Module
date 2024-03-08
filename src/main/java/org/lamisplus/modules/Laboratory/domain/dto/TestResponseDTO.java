package org.lamisplus.modules.laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TestResponseDTO {
    private Integer id;
    private Integer labTestId;
    private String description;
    private String labTestName;
    private String labNumber;
    private String unitMeasurement;
    private Integer labTestGroupId;
    private String labTestGroupName;
    private Integer orderPriority;
    private String orderPriorityName;
    private Integer labTestOrderStatus;
    private String labTestOrderStatusName;
    private Integer viralLoadIndication;
    private String viralLoadIndicationName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderDate;
    private Integer archived;
//    private String labOrderIndication;
//    private LocalDate orderedDate;
    private List<SampleResponseDTO> samples;
    private List<ResultDTO> results;
}
