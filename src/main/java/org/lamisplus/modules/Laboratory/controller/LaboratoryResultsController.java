package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.HistoricalResultResponseDTO;
import org.lamisplus.modules.Laboratory.domain.dto.ResultDTO;
import org.lamisplus.modules.Laboratory.service.LabOrderService;
import org.lamisplus.modules.Laboratory.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryResultsController {
    private final ResultService resultService;
    private final LabOrderService labOrderService;

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
}
