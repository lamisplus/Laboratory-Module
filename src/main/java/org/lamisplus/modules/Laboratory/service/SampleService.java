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
        Sample sample = labMapper.tosSample(sampleDTO);
        //sample.setSampleCollectedBy(SecurityUtils.getCurrentUserLogin().orElse(""));
        sample.setUuid(UUID.randomUUID().toString());

        Test test = testRepository.findById(sample.getTestId()).orElse(null);
        assert test != null;
        sample.setPatientUuid(test.getPatientUuid());
        sample.setPatientId(test.getPatientId());
        sample.setFacilityId(getCurrentUserOrganization());
        sample.setArchived(0);
        SaveLabNumber(sample.getTestId(), labNumber, SAMPLE_COLLECTED);
        return labMapper.tosSampleDto(repository.save(sample));
    }

    public List<SampleDTO> SaveSamples(String labNumber, List<SampleDTO> sampleDTOs) {
        List<SampleDTO> saved_samples = new ArrayList<>();
        for (SampleDTO dto : sampleDTOs) {
            saved_samples.add(Save(labNumber, dto));
        }
        return saved_samples;
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles();
        return userWithRoles.map(User::getCurrentOrganisationUnitId).orElse(null);
    }

    public void SaveLabNumber(int testId, String labNumber, int orderStatus) {
        Test test = testRepository.findById(testId).orElse(null);
        test.setLabNumber(labNumber);
        test.setLabTestOrderStatus(orderStatus);
        testRepository.save(test);
    }

    public SampleDTO Update(int orderId, String labNumber, SampleDTO sampleDTO) {
        Sample updated_sample = labMapper.tosSample(sampleDTO);
        SaveLabNumber(updated_sample.getTestId(), labNumber, SAMPLE_COLLECTED);
        return labMapper.tosSampleDto(repository.save(updated_sample));
    }

    public String Delete(Integer id) {
        Sample labOrder = repository.findById(id).orElse(null);
        //repository.delete(labOrder);
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

    public SampleDTO FindById(int id) {
        Sample sample = repository.findByIdAndArchived(id, 0).orElse(null);
        return labMapper.tosSampleDto(sample);
    }

    public List<PCRLab> getAllPCRLabs() {
        return pcrLabRepository.allpcrlabs();
    }

    @SneakyThrows
    public PCRLab getSingleLab(Long id) {
        return pcrLabRepository.findById(id)
                .orElseThrow(() -> new Exception("LIMSPCRLab NOT FOUND"));
    }


}
