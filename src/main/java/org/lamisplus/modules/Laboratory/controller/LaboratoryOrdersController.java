package org.lamisplus.modules.Laboratory.controller;

import io.micrometer.core.instrument.util.JsonUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.Laboratory.domain.dto.*;
import org.lamisplus.modules.Laboratory.service.LabOrderService;
import org.lamisplus.modules.Laboratory.service.TestService;
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
public class LaboratoryOrdersController {
    private final LabOrderService labOrderService;
    private final TestService testService;


    @PostMapping("/orders")
    public ResponseEntity<?> SaveLabOrder(@RequestBody LabOrderDTO labOrder){
        try {

            Log.info("Received lab order request for patient ID: " + labOrder.getPatientId() +
                    ", visit ID: " + labOrder.getVisitId());

            if (labOrder.getTests() != null) {
                Log.info("Number of tests: " + labOrder.getTests().size());
                for (int i = 0; i < labOrder.getTests().size(); i++) {
                    TestDTO test = labOrder.getTests().get(i);
                    Log.info("Test " + (i+1) + " - LabTestId: " + test.getLabTestId() +
                            ", GroupId: " + test.getLabTestGroupId() +
                            ", Priority: " + test.getOrderPriority());
                }
            }

            LabOrderResponseDTO response = labOrderService.Save(labOrder);

            if (response != null) {
                Log.info("Lab order saved successfully with ID: " + response.getId());
                return ResponseEntity.ok(response);
            } else {
                Log.error("Lab order service returned null response");
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Failed to save lab order - service returned null");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
            }
        } catch (Exception e) {
            Log.error("Error in SaveLabOrder controller: " + e.getMessage(), e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Server error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
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

    @GetMapping("/orders/pending-sample-collection/patients/{patientId}")
    public LabOrderListMetaDataDTO GetOrdersPendingSampleCollectionByPatient(@PathVariable Integer patientId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return labOrderService.GetOrdersPendingSampleCollectionByPatient(patientId, pageNo, pageSize);
    }

    @GetMapping("/orders/pending-sample-verification/patients/{patientId}")
    public LabOrderListMetaDataDTO GetOrdersPendingSampleVerificationByPatient(@PathVariable Integer patientId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return labOrderService.GetOrdersPendingSampleVerificationByPatient(patientId, pageNo, pageSize);
    }

    @GetMapping("/orders/pending-results/patients/{patientId}")
    public LabOrderListMetaDataDTO GetOrdersPendingResultsByPatient(@PathVariable Integer patientId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return labOrderService.GetOrdersPendingResultsByPatient(patientId, pageNo, pageSize);
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
