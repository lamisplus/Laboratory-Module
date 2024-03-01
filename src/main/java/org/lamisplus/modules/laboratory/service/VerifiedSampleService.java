package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.Laboratory.domain.dto.VerifiedSampleDTO;
import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.SampleRepository;
import org.lamisplus.modules.Laboratory.repository.TestRepository;
import org.lamisplus.modules.base.security.SecurityUtils;
import org.springframework.stereotype.Service;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.SAMPLE_VERIFIED;


@Service
@RequiredArgsConstructor
public class VerifiedSampleService {
    private final SampleRepository repository;
    private final LabMapper labMapper;
    private final TestRepository testRepository;

    public VerifiedSampleDTO Save(VerifiedSampleDTO verifiedSampleDTO, Integer sampleId){
        Sample sample = repository.findById(sampleId).orElse(null);
        sample.setDateSampleVerified(verifiedSampleDTO.getDateSampleVerified());
        sample.setSampleAccepted(verifiedSampleDTO.getSampleAccepted());
        sample.setCommentSampleVerified(verifiedSampleDTO.getCommentSampleVerified());
        sample.setSampleVerifiedBy(SecurityUtils.getCurrentUserLogin().orElse(""));

        Test test = testRepository.findById(sample.getTestId()).orElse(null);
        test.setLabTestOrderStatus(SAMPLE_VERIFIED);
        testRepository.save(test);

        return labMapper.toVerifiedSampleDto(repository.save(sample));
    }

    public String Delete(Integer sampleId){
        Sample sample = repository.findById(sampleId).orElse(null);
        sample.setDateSampleVerified(null);
        sample.setCommentSampleVerified(null);

        return "Sample verification deleted successfully";
    }
}
