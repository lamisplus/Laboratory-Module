package org.lamisplus.modules.Laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.*;
import org.lamisplus.modules.Laboratory.service.LabOrderService;
import org.lamisplus.modules.Laboratory.service.TestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryOrdersController {
    private final LabOrderService labOrderService;
    private final TestService testService;


    @PostMapping("/orders")
    public LabOrderResponseDTO SaveLabOrder(@RequestBody LabOrderDTO labOrder){
        return labOrderService.Save(labOrder);
    }

    @PutMapping("/orders/{id}")
    public LabOrderResponseDTO UpdateLabOrder(@PathVariable int id, @RequestBody LabOrderDTO labOrder){
        return labOrderService.Update(id, labOrder);
    }

    @DeleteMapping("/orders/{id}")
    public String DeleteLabOrder(@PathVariable int id){
        return labOrderService.Delete(id);
    }

    @GetMapping("/orders")
    public List<PatientLabOrderDTO> GetAllLabOrders(){
        return labOrderService.GetAllLabOrders();
    }

    @GetMapping("/orders/{id}")
    public PatientLabOrderDTO GetOrderById(@PathVariable int id){
        return labOrderService.GetOrderById(id);
    }

    @GetMapping("/orders/patients/{patient_id}")
    public List<PatientLabOrderDTO> GetLabOrdersByPatientId(@PathVariable int patient_id){
        return labOrderService.GetAllOrdersByPatientId(patient_id);
    }

    @GetMapping("/orders/visits/{visit_id}")
    public List<PatientLabOrderDTO> GetLabOrdersByVisitId(@PathVariable int visit_id){
        return labOrderService.GetAllOrdersByVisitId(visit_id);
    }

    @GetMapping("/orders/pending-sample-collection")
    public LabOrderListMetaDataDTO GetOrdersPendingSampleCollection(@RequestParam(defaultValue = "*") String searchParam,
                                                                    @RequestParam(defaultValue = "0") Integer pageNo,
                                                                    @RequestParam(defaultValue = "10") Integer pageSize){
        return labOrderService.GetOrdersPendingSampleCollection(searchParam, pageNo, pageSize);
    }
    @GetMapping("/orders/pending-sample-verification")
    public LabOrderListMetaDataDTO GetOrdersPendingSampleVerification(@RequestParam(defaultValue = "*") String searchParam,
                                                                      @RequestParam(defaultValue = "0") Integer pageNo,
                                                                      @RequestParam(defaultValue = "10") Integer pageSize){
        return labOrderService.GetOrdersPendingSampleVerification(searchParam, pageNo, pageSize);
    }
    @GetMapping("/orders/pending-results")
    public LabOrderListMetaDataDTO GetOrdersPendingResults(@RequestParam(defaultValue = "*") String searchParam,
                                                           @RequestParam(defaultValue = "0") Integer pageNo,
                                                           @RequestParam(defaultValue = "10") Integer pageSize){
        return labOrderService.GetOrdersPendingResults(searchParam, pageNo, pageSize);
    }

    @PostMapping("/orders/tests")
    public TestDTO SaveTest(@RequestBody TestDTO test){
        return testService.Save(test);
    }

    @PutMapping("/orders/tests/{id}")
    public TestDTO UpdateTest(@PathVariable int id, @RequestBody TestDTO test){
        return testService.Update(id, test);
    }

    @DeleteMapping("/orders/tests/{id}")
    public String DeleteTest(@PathVariable Integer id){
        return testService.Delete(id);
    }
}
