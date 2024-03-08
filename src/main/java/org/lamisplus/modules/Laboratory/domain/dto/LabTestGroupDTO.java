package org.lamisplus.modules.laboratory.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class LabTestGroupDTO {
    private Integer id;
    private String GroupName;
    private List<LabTestDTO> labTests;
}
