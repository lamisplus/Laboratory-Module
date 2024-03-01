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

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        lastTestResult.setDateResultReported(LocalDate.from(result.getDateResultReported()));
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

    @GetMapping("/cs/page/load/{patientId}/{facilityId}")
    public ResponseEntity<Map<String, Object>> getCSPageLoad(@PathVariable Long patientId, @PathVariable Long facilityId) {
        Map<String, Object> map = new HashMap<>();

        Optional<Result> cd4 = resultRepository.getLastTestResult(patientId,facilityId, 1);

        if(cd4.isPresent()){
            map.put("cd4", resultService.convertResultToLastTestResult(cd4.get()));
        } else {
            cd4 = resultRepository.getLastTestResult(patientId,facilityId, 50);
            cd4.ifPresent(result -> map.put("cd4", resultService.convertResultToLastTestResult(result)));
        }
        Optional<Result> vl = resultRepository.getLastTestResult(patientId,facilityId, 16);
        vl.ifPresent(result -> map.put("vl", resultService.convertResultToLastTestResult(result)));

        if(!map.isEmpty()){
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
