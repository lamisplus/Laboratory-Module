package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.Laboratory.domain.dto.VerifiedSampleDTO;
import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.SampleRepository;
import org.lamisplus.modules.base.security.SecurityUtils;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class VerifiedSampleService {
    private final SampleRepository repository;
    private final LabMapper labMapper;

    public VerifiedSampleDTO Save(VerifiedSampleDTO verifiedSampleDTO, Integer sampleId) {
        Sample sample = repository.findById(sampleId).orElse(null);
        sample.setDateSampleVerified(verifiedSampleDTO.getDateSampleVerified());
        sample.setSampleAccepted(verifiedSampleDTO.getSampleAccepted());
        sample.setCommentSampleVerified(verifiedSampleDTO.getCommentSampleVerified());
        sample.setSampleVerifiedBy(SecurityUtils.getCurrentUserLogin().orElse(""));

     
        Sample savedSample = repository.save(sample);

        return labMapper.toVerifiedSampleDto(savedSample);
    }

    public String Delete(Integer sampleId) {
        Sample sample = repository.findById(sampleId).orElse(null);
        sample.setDateSampleVerified(null);
        sample.setCommentSampleVerified(null);

        return "Sample verification deleted successfully";
    }

    public boolean doesSampleNumberExist(String sampleNumber) {
        if (sampleNumber == null || sampleNumber.isEmpty()) {
            return false;
        }
        return repository.existsBySampleNumberAndArchived(sampleNumber);
    }
}
