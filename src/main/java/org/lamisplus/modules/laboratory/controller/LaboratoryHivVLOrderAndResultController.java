package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.RDELabOrderRequestDTO;
import org.lamisplus.modules.Laboratory.domain.dto.RDELabOrderResponseDTO;
import org.lamisplus.modules.Laboratory.domain.dto.VLOrderAndResultRequestDTO;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.service.RDELabTestService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryHivVLOrderAndResultController {
    private final RDELabTestService labTestService;
    private final LabMapper labMapper;

    @PostMapping("/vl-results")
    public List<RDELabOrderRequestDTO> Save(@RequestBody VLOrderAndResultRequestDTO labOrder){
        List<VLOrderAndResultRequestDTO> labOrders = new ArrayList<>();
        labOrders.add(labOrder);
        return labTestService.SaveRDELabTests(labMapper.VLOrderAndResultToList(labOrders));
    }

    @PutMapping("/vl-results/{orderId}")
    public List<RDELabOrderRequestDTO> Update(@PathVariable int orderId, @RequestBody VLOrderAndResultRequestDTO labOrder){
        List<VLOrderAndResultRequestDTO> labOrders = new ArrayList<>();
        labOrders.add(labOrder);
        return labTestService.UpdateRDELabTests(orderId, labMapper.VLOrderAndResultToList(labOrders));
    }

    @DeleteMapping("/vl-results/tests/{id}")
    public String Delete(@PathVariable int id){
        return labTestService.DeleteRDELabTest(id);
    }

    @GetMapping("/vl-results/latest-viral-loads/{patientId}")
    public RDELabOrderResponseDTO GetLatestViralLoadByPatientId(@PathVariable int patientId){
        return labTestService.GetLatestVL(patientId);
    }
    @GetMapping("/vl-results/patients/{patientId}")
    public List<RDELabOrderResponseDTO> GetRDEOrderByPatientId(@PathVariable int patientId){
        return labTestService.GetRDEOrderByPatientId(patientId, RDELabTestService.VL_ORDER);
    }
}
