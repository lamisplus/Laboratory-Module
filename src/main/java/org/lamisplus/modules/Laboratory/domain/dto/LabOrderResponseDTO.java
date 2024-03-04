package org.lamisplus.modules.Laboratory.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class LabOrderResponseDTO {
    private Integer id;
    private Integer visitId;
    private Integer patientId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderDate;
    private String userId;
    private String labOrderIndication;
    private LocalDate orderedDate;
    private List<TestResponseDTO> tests;
}
