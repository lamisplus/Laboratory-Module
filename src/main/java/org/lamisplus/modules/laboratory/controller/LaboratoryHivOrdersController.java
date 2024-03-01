package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.OtherTestOrderRequestDTO;
import org.lamisplus.modules.Laboratory.domain.dto.RDELabOrderRequestDTO;
import org.lamisplus.modules.Laboratory.domain.dto.RDELabOrderResponseDTO;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.service.RDELabTestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryHivOrdersController {
    private final RDELabTestService labTestService;
    private final LabMapper labMapper;

    @PostMapping("/rde-orders")
    public List<RDELabOrderRequestDTO> SaveRDELabOrder(@RequestBody List<OtherTestOrderRequestDTO> labOrders){
        return labTestService.SaveRDELabTests(labMapper.OtherTestOrderToList(labOrders));
    }
    @PutMapping("/rde-orders/{orderId}")
    public List<RDELabOrderRequestDTO> UpdateRDELabOrder(@PathVariable int orderId, @RequestBody List<OtherTestOrderRequestDTO> labOrders){
        List<RDELabOrderRequestDTO> labDtoList = labMapper.OtherTestOrderToList(labOrders);
        log.info("data for update: ",labDtoList );
        return labTestService.UpdateRDELabTests(orderId, labDtoList);
    }
    @PutMapping("/rde-orders/tests/{id}")
    public RDELabOrderRequestDTO UpdateRDETest(@PathVariable int id, @RequestBody OtherTestOrderRequestDTO rdeTestDTO){
        return labTestService.UpdateRDELabTest(id, labMapper.toRdeLabOrderRequestDto(rdeTestDTO));
    }

    @DeleteMapping("/rde-orders/tests/{id}")
    public String DeleteRDETest(@PathVariable int id){
        return labTestService.DeleteRDELabTest(id);
    }

    @GetMapping("/rde-orders/{orderId}")
    public List<RDELabOrderResponseDTO> GetRDEOrderById(@PathVariable int orderId){
        return labTestService.GetRDEOrderById(orderId);
    }

    @GetMapping("/rde-orders/patients/{patientId}")
    public List<RDELabOrderResponseDTO> GetRDEOrderByPatientId(@PathVariable int patientId){
        return labTestService.GetRDEOrderByPatientId(patientId, RDELabTestService.LAB_ORDER);
    }

    @GetMapping("/rde-all-orders/patients/{patientId}")
    public List<RDELabOrderResponseDTO> GetRDEAllOrderByPatientId(@PathVariable int patientId){
        return labTestService.GetRDEOrderByPatientId(patientId, RDELabTestService.ALL_ORDER);
    }

    @GetMapping("/rde-orders/latest-viral-loads/{patientId}")
    public RDELabOrderResponseDTO GetLatestViralLoadByPatientId(@PathVariable int patientId){
        return labTestService.GetLatestVL(patientId);
    }
}
