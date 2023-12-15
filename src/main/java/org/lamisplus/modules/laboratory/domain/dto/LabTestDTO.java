package org.lamisplus.modules.laboratory.domain.dto;

import lombok.Data;
import org.lamisplus.modules.laboratory.domain.entity.SampleType;

import java.util.List;

@Data
public class LabTestDTO {
    private Integer id;
    private String labTestName;
    private String unit;
    private List<SampleType> sampleType;
}
