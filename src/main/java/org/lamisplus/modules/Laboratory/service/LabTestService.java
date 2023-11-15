package org.lamisplus.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.laboratory.domain.entity.LabTest;
import org.lamisplus.modules.laboratory.repository.LabTestRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LabTestService {
    private final LabTestRepository labTestRepository;

    public String FindLabTestNameById(Integer id){
        return Objects.requireNonNull(labTestRepository.findById(id).orElse(null)).getLabTestName();
    }

    public String FindLabTestMeasurementById(Integer id){
        return Objects.requireNonNull(labTestRepository.findById(id).orElse(null)).getUnit();
    }

    public LabTest FindLabTestByName(String Name){
        return labTestRepository.findById(16).orElse(null);
    }
}
