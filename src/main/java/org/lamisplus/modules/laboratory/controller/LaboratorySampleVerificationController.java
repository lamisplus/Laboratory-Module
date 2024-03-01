package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.VerifiedSampleDTO;
import org.lamisplus.modules.Laboratory.service.VerifiedSampleService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratorySampleVerificationController {
    public final VerifiedSampleService verifiedSampleService;


    @PostMapping("/verified-samples/{sample_id}")
    public VerifiedSampleDTO SaveVerifiedSample(@PathVariable int sample_id, @RequestBody VerifiedSampleDTO verifiedSampleDTO){
        return verifiedSampleService.Save(verifiedSampleDTO, sample_id);
    }

    @DeleteMapping("/verified-samples/{sample_id}")
    public String DeleteVerifiedSample(@PathVariable Integer sample_id){
        return verifiedSampleService.Delete(sample_id);
    }
}
