package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.SampleDTO;
import org.lamisplus.modules.Laboratory.domain.entity.PCRLab;
import org.lamisplus.modules.Laboratory.service.SampleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratorySampleCollectionController {
    private final SampleService sampleService;

    @PostMapping("/samples/{labNumber}")
    public ResponseEntity<?> SaveSample(@PathVariable String labNumber, @RequestBody List<SampleDTO> samples) {
        try {
           
            log.info("Received request to save {} samples with lab number: {}",
                    samples != null ? samples.size() : 0, labNumber);

           
            if (labNumber == null || labNumber.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Lab number is required");
                return ResponseEntity.badRequest().body(error);
            }

            if (samples == null || samples.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "At least one sample is required");
                return ResponseEntity.badRequest().body(error);
            }

            
            for (int i = 0; i < samples.size(); i++) {
                SampleDTO sample = samples.get(i);
                log.info("Sample {}: testId={}, sampleNumber={}, sampleTypeId={}, collectedBy={}",
                        i + 1, sample.getTestId(), sample.getSampleNumber(),
                        sample.getSampleTypeId(), sample.getSampleCollectedBy());
            }

            
            List<SampleDTO> savedSamples = sampleService.SaveSamples(labNumber, samples);

            log.info("Successfully saved {} samples", savedSamples.size());
            return ResponseEntity.ok(savedSamples);

        } catch (IllegalArgumentException e) {
            log.error("Validation error: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);

        } catch (Exception e) {
            log.error("Error saving samples with lab number {}: {}", labNumber, e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to save samples: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/samples/{id}/{labNumber}")
    public ResponseEntity<?> UpdateSample(@PathVariable int id, @PathVariable String labNumber, @RequestBody SampleDTO sampleDTO) {
        try {
            log.info("Updating sample {} with lab number: {}", id, labNumber);
            SampleDTO updatedSample = sampleService.Update(id, labNumber, sampleDTO);
            return ResponseEntity.ok(updatedSample);
        } catch (IllegalArgumentException e) {
            log.error("Validation error updating sample {}: {}", id, e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            log.error("Error updating sample {}: {}", id, e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update sample: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/samples/{id}")
    public ResponseEntity<?> UpdateSample(@PathVariable int id, @RequestBody SampleDTO sampleDTO) {
        try {
            log.info("Updating sample with ID: {}", id);

            
            if (id <= 0) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid sample ID");
                return ResponseEntity.badRequest().body(error);
            }

            
            if (sampleDTO != null) {
                log.info("Update data - testId: {}, sampleNumber: {}, sampleTypeId: {}, collectedBy: {}",
                        sampleDTO.getTestId(), sampleDTO.getSampleNumber(),
                        sampleDTO.getSampleTypeId(), sampleDTO.getSampleCollectedBy());
            }

            SampleDTO updatedSample = sampleService.Update(id, sampleDTO);
            log.info("Successfully updated sample {}", id);
            return ResponseEntity.ok(updatedSample);

        } catch (IllegalArgumentException e) {
            log.error("Validation error updating sample {}: {}", id, e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            log.error("Error updating sample {}: {}", id, e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update sample: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/samples/{id}")
    public ResponseEntity<?> DeleteSample(@PathVariable Integer id) {
        try {
            log.info("Deleting sample: {}", id);
            String result = sampleService.Delete(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", result);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.error("Validation error deleting sample {}: {}", id, e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            log.error("Error deleting sample {}: {}", id, e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete sample: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/get-prclabs/")
    public ResponseEntity<?> getPCRLabs() {
        try {
            List<PCRLab> labs = sampleService.getAllPCRLabs();
            return ResponseEntity.ok(labs);
        } catch (Exception e) {
            log.error("Error fetching PCR labs: {}", e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch PCR labs: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("get-single-pcrlab/{id}")
    public ResponseEntity<?> getPCRLabById(@PathVariable("id") Long id) {
        try {
            PCRLab lab = sampleService.getSingleLab(id);
            return ResponseEntity.ok(lab);
        } catch (Exception e) {
            log.error("Error fetching PCR lab {}: {}", id, e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch PCR lab: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
