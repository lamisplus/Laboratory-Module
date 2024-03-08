package org.lamisplus.modules.laboratory.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LastTestResult {
    String resultReported;
    LocalDate dateResultReported;
    Integer id;
    String patientUuid;
    Integer patientId;
}
