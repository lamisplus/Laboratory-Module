package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.SampleDTO;
import org.lamisplus.modules.Laboratory.domain.entity.PCRLab;
import org.lamisplus.modules.Laboratory.service.SampleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratorySampleCollectionController {
    private final SampleService sampleService;


    @PostMapping("/samples/{labNumber}")
    public List<SampleDTO> SaveSample(@PathVariable String labNumber, @RequestBody List<SampleDTO> samples){
        return sampleService.SaveSamples(labNumber, samples);
    }

    @PutMapping("/samples/{id}/{labNumber}")
    public SampleDTO UpdateSample(@PathVariable int id, @PathVariable String labNumber, @RequestBody SampleDTO sampleDTO){
        return sampleService.Update(id, labNumber, sampleDTO);
    }

    @DeleteMapping("/samples/{id}")
    public String DeleteSample(@PathVariable Integer id){
        return sampleService.Delete(id);
    }

    @GetMapping("/get-prclabs/")
    public List<PCRLab> getPCRLabs() {
        return sampleService.getAllPCRLabs();
    }

    @GetMapping("get-single-pcrlab/{id}")
    public ResponseEntity<PCRLab> getPCRLabById(@PathVariable("id") Long id) {

        return ResponseEntity.ok (sampleService.getSingleLab(id));
    }
}
