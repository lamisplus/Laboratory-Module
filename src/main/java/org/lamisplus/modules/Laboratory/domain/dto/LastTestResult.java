package org.lamisplus.modules.Laboratory.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LastTestResult {
    String resultReported;
    Integer Id;
    LocalDateTime dateResultReported;
    String patientUuid;
    Integer patientId;
}
