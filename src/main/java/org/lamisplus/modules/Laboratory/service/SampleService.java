package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.lamisplus.modules.Laboratory.domain.dto.SampleDTO;
import org.lamisplus.modules.Laboratory.domain.entity.PCRLab;
import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.PCRLabRepository;
import org.lamisplus.modules.Laboratory.repository.SampleRepository;
import org.lamisplus.modules.Laboratory.repository.TestRepository;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.SAMPLE_COLLECTED;


@Service
@RequiredArgsConstructor
public class SampleService {
    private final SampleRepository repository;
    private final LabMapper labMapper;
    private final TestRepository testRepository;
    private final UserService userService;
    private final PCRLabRepository pcrLabRepository;

    public SampleDTO Save(String labNumber, SampleDTO sampleDTO) {
        try {

            if (sampleDTO == null) {
                throw new IllegalArgumentException("Sample data cannot be null");
            }

            if (sampleDTO.getTestId() == null) {
                throw new IllegalArgumentException("Test ID is required");
            }

            if (sampleDTO.getSampleNumber() == null || sampleDTO.getSampleNumber().trim().isEmpty()) {
                throw new IllegalArgumentException("Sample number is required");
            }

            Test test = testRepository.findById(sampleDTO.getTestId()).orElse(null);
            if (test == null) {
                throw new IllegalArgumentException("Test not found with ID: " + sampleDTO.getTestId());
            }

            Sample sample = labMapper.tosSample(sampleDTO);
            sample.setUuid(UUID.randomUUID().toString());
            sample.setPatientUuid(test.getPatientUuid());
            sample.setPatientId(test.getPatientId());
            sample.setFacilityId(getCurrentUserOrganization());
            sample.setArchived(0);

            Sample savedSample = repository.save(sample);

            try {
                SaveLabNumber(sampleDTO.getTestId(), labNumber, SAMPLE_COLLECTED);
            } catch (Exception e) {

                System.err.println("Warning: Failed to update test status: " + e.getMessage());
            }

            return labMapper.tosSampleDto(savedSample);

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save sample: " + e.getMessage(), e);
        }
    }

    public List<SampleDTO> SaveSamples(String labNumber, List<SampleDTO> sampleDTOs) {

        if (sampleDTOs == null || sampleDTOs.isEmpty()) {
            throw new IllegalArgumentException("Sample list cannot be null or empty");
        }

        if (labNumber == null || labNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Lab number is required");
        }

        List<SampleDTO> savedSamples = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (int i = 0; i < sampleDTOs.size(); i++) {
            SampleDTO dto = sampleDTOs.get(i);
            try {
                SampleDTO saved = Save(labNumber, dto);
                savedSamples.add(saved);
            } catch (Exception e) {
                String error = "Sample " + (i + 1) + ": " + e.getMessage();
                errors.add(error);
                System.err.println("Error saving sample: " + error);
            }
        }

        if (!errors.isEmpty()) {
            throw new RuntimeException("Failed to save some samples: " + String.join("; ", errors));
        }

        return savedSamples;
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles();
        return userWithRoles.map(User::getCurrentOrganisationUnitId).orElse(null);
    }

    public void SaveLabNumber(int testId, String labNumber, int orderStatus) {
        try {
            Test test = testRepository.findById(testId).orElse(null);
            if (test != null) {
                test.setLabNumber(labNumber);
                test.setLabTestOrderStatus(orderStatus);
                testRepository.save(test);
            } else {
                throw new IllegalArgumentException("Test not found with ID: " + testId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to update test status: " + e.getMessage(), e);
        }
    }

    public SampleDTO Update(int orderId, String labNumber, SampleDTO sampleDTO) {
        Sample updated_sample = labMapper.tosSample(sampleDTO);
        SaveLabNumber(updated_sample.getTestId(), labNumber, SAMPLE_COLLECTED);
        return labMapper.tosSampleDto(repository.save(updated_sample));
    }

    public String Delete(Integer id) {
        Sample labOrder = repository.findById(id).orElse(null);
        if (labOrder == null) {
            throw new IllegalArgumentException("Sample not found with ID: " + id);
        }
        labOrder.setArchived(1);
        repository.save(labOrder);
        return id + " deleted successfully";
    }

    public SampleDTO FindByTestId(int id) {
        List<Sample> sampleList = repository.findAllByTestIdAndArchived(id, 0);
        if (sampleList.size() > 0) {
            return labMapper.tosSampleDto(sampleList.get(0));
        } else {
            return new SampleDTO();
        }
    }

    public SampleDTO Update(int sampleId, SampleDTO sampleDTO) {
        try {

            if (sampleDTO == null) {
                throw new IllegalArgumentException("Sample data cannot be null");
            }

            Sample existingSample = repository.findByIdAndArchived(sampleId, 0).orElse(null);
            if (existingSample == null) {
                throw new IllegalArgumentException("Sample not found with ID: " + sampleId);
            }

            Sample updatedSample = labMapper.tosSample(sampleDTO);

            updatedSample.setId(sampleId);
            updatedSample.setUuid(existingSample.getUuid());
            updatedSample.setPatientUuid(existingSample.getPatientUuid());
            updatedSample.setPatientId(existingSample.getPatientId());
            updatedSample.setFacilityId(existingSample.getFacilityId());
            updatedSample.setArchived(0);

            String labNumber;
            if (existingSample.getTestId() != null) {
                Test existingTest = testRepository.findById(existingSample.getTestId()).orElse(null);
                if (existingTest != null && existingTest.getLabNumber() != null
                        && !existingTest.getLabNumber().trim().isEmpty()) {
                    labNumber = existingTest.getLabNumber();
                } else {
                    labNumber = "LAB-UPDATE-" + sampleId + "-" + System.currentTimeMillis();
                }
            } else {
                labNumber = "LAB-UPDATE-" + sampleId + "-" + System.currentTimeMillis();
            }

            Sample savedSample = repository.save(updatedSample);

            if (sampleDTO.getTestId() != null) {
                try {
                    SaveLabNumber(sampleDTO.getTestId(), labNumber, SAMPLE_COLLECTED);
                } catch (Exception e) {
                    System.err.println("Warning: Failed to update test status: " + e.getMessage());
                }
            }

            return labMapper.tosSampleDto(savedSample);

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update sample: " + e.getMessage(), e);
        }
    }

    public SampleDTO FindById(int id) {
        Sample sample = repository.findByIdAndArchived(id, 0).orElse(null);
        return labMapper.tosSampleDto(sample);
    }

    public List<PCRLab> getAllPCRLabs() {
        return pcrLabRepository.allpcrlabs();
    }

    public PCRLab getSingleLab(Long id) {
        return pcrLabRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PCR Lab not found with ID: " + id));
    }


}
