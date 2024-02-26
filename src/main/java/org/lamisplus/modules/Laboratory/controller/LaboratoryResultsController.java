package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.Laboratory.domain.dto.HistoricalResultResponseDTO;
import org.lamisplus.modules.Laboratory.domain.dto.LastTestResult;
import org.lamisplus.modules.Laboratory.domain.dto.ResultDTO;
import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.lamisplus.modules.Laboratory.repository.ResultRepository;
import org.lamisplus.modules.Laboratory.service.LabOrderService;
import org.lamisplus.modules.Laboratory.service.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryResultsController {
    private final ResultService resultService;
    private final LabOrderService labOrderService;
    private final ResultRepository resultRepository;

    @PostMapping("/results")
    public ResultDTO SaveResult(@RequestBody ResultDTO result){
        return resultService.Save(result);
    }

    @PutMapping("/results/{id}")
    public ResultDTO UpdateResult(@PathVariable int id, @RequestBody ResultDTO result){
        return resultService.Update(id, result);
    }

    @DeleteMapping("/results/{id}")
    public String DeleteResult(@PathVariable Integer id){
        return resultService.Delete(id);
    }

    @GetMapping("/results/{id}")
    public ResultDTO GetResultById(@PathVariable int id){
        return resultService.GetResultsById(id);
    }

    @GetMapping("/results/tests/{id}")
    public ResultDTO GetResultByTestId(@PathVariable int id){
        return resultService.GetResultsByTestId(id);
    }

    @GetMapping("/results/patients/{id}")
    public List<HistoricalResultResponseDTO> GetHistoricalResultsByPatientId(@PathVariable int id){
        return labOrderService.GetHistoricalResultsByPatientId(id);
    }

    @GetMapping("/last/test/result/{testId}/{patientId}/{facilityId}")
    public ResponseEntity<LastTestResult> getLastTestResult(@PathVariable Integer testId, @PathVariable Long patientId,
                                                            @PathVariable Long facilityId) {
        Result result = resultRepository.getLastTestResult(patientId, facilityId, testId).get();
        LastTestResult lastTestResult = new LastTestResult();
        lastTestResult.setResultReported(result.getResultReported());
        lastTestResult.setDateResultReported(result.getDateResultReported());
        lastTestResult.setId(result.getId());
        lastTestResult.setPatientUuid(result.getPatientUuid());
        lastTestResult.setPatientId(result.getPatientId());
        Log.info("Last test result ****** {} ", lastTestResult);
        if (lastTestResult != null) {
            return new ResponseEntity<>(lastTestResult, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
