package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.entity.LabTest;
import org.lamisplus.modules.Laboratory.repository.LabTestRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
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
