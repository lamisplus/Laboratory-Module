package org.lamisplus.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.laboratory.domain.dto.*;
import org.lamisplus.modules.laboratory.domain.entity.LabOrder;
import org.lamisplus.modules.laboratory.domain.entity.Sample;
import org.lamisplus.modules.laboratory.domain.entity.Test;
import org.lamisplus.modules.laboratory.repository.LabOrderRepository;
import org.lamisplus.modules.laboratory.repository.SampleRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.lamisplus.modules.laboratory.utility.LabUtils.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RDELabTestService {
    private final LabOrderService labOrderService;
    private final TestService testService;
    private final SampleService sampleService;
    private final SampleRepository sampleRepository;
    private final ResultService resultService;
    private final PersonRepository personRepository;
    private final LabOrderRepository labOrderRepository;
    public static final int LAB_ORDER = 1;
    public static final int VL_ORDER = 2;
    public static final int ALL_ORDER = 3;

    //RDE
    public List<RDELabOrderRequestDTO> SaveRDELabTests(List<RDELabOrderRequestDTO> labDtoList){
        //Save order
        log.info("data list {}", labDtoList);
        LabOrderDTO labOrderDTO = new LabOrderDTO();
        List<TestDTO> tests = new ArrayList<>();

        RDELabOrderRequestDTO rdeTestDTO = labDtoList.get(0);
        labOrderDTO.setOrderDate(rdeTestDTO.getSampleCollectionDate());
        labOrderDTO.setPatientId(rdeTestDTO.getPatientId());
        labOrderDTO.setVisitId(0); //TODO get visit ID
        if(rdeTestDTO.getClinicianName() == null){
            labOrderDTO.setUserId(rdeTestDTO.getOrderBy());
        }
        else {
            labOrderDTO.setUserId(rdeTestDTO.getClinicianName());
        }

        for (RDELabOrderRequestDTO dto:labDtoList) {
            TestDTO test = new TestDTO();
            test.setLabTestId(dto.getLabTestId());
            test.setLabTestGroupId(dto.getLabTestGroupId());
            test.setViralLoadIndication(dto.getViralLoadIndication());
            test.setDescription(dto.getComments());

            if(dto.getResult() == null || dto.getResult().isEmpty() || dto.getResult().trim().isEmpty()) {
                test.setLabTestOrderStatus(SAMPLE_COLLECTED);
                Log.info("Sample-collected");
            }
            else{
                test.setLabTestOrderStatus(RESULT_REPORTED);
                Log.info("result-reported");
            }
            tests.add(test);
        }

        labOrderDTO.setTests(tests);
        log.info("labOrderDTO {}", labOrderDTO);
        LabOrderResponseDTO responseDTO = labOrderService.Save(labOrderDTO);

        //save sample and result
        List<TestResponseDTO> saveTest = responseDTO.getTests().stream().filter(x -> x.getArchived().equals(0)).collect(Collectors.toList());
        log.info("saveTest: {}", saveTest);
        for(TestResponseDTO test: saveTest)
        {
            RDELabOrderRequestDTO dto = labDtoList.stream().filter(submittedTest -> Objects.equals(submittedTest.getLabTestId(), test.getLabTestId())).findFirst().orElse(null);
            assert dto != null;

            //save sample
            SampleDTO sample = new SampleDTO();
            sample.setDateSampleCollected(dto.getSampleCollectionDate());
            sample.setSampleCollectedBy(dto.getSampleCollectedBy());
            sample.setTestId(test.getId());
            sample.setSampleTypeId(dto.getSampleTypeId());
            sample.setCommentSampleCollected(dto.getComments());
            sample.setDateSampleLoggedRemotely(dto.getDateSampleLoggedRemotely());
            sample.setSampleLoggedRemotely(dto.getSampleLoggedRemotely());
            if(dto.getSampleNumber().length()==0) {
                sample.setSampleNumber(Generate_Random_ID() + "-" + String.format("%05d", dto.getPatientId()));
            }
            else {
                sample.setSampleNumber(dto.getSampleNumber());
            }
            Log.info(sample.toString());
            SampleDTO dto1 = sampleService.Save(dto.getLabNumber(), sample);

            //Save verification info
            Sample verifiedSample = sampleRepository.findByIdAndArchived(dto1.getId(), 0).orElse(null);
            assert verifiedSample != null;
            verifiedSample.setDateSampleVerified(dto.getSampleCollectionDate());
            verifiedSample.setCommentSampleVerified("Sample verified");
            verifiedSample.setSampleVerifiedBy(dto.getSampleCollectedBy());
            Log.info(verifiedSample.toString());
            sampleRepository.save(verifiedSample);

            //save result
            Optional<RDELabOrderRequestDTO> requestDTO =
                    labDtoList.stream().filter(lab -> lab.getLabTestId().equals(test.getLabTestId()))
                    .findFirst();
            if(requestDTO.isPresent()  &&  requestDTO.get().getResult() != null) {
                RDELabOrderRequestDTO rdeLabOrderRequestDTO = requestDTO.get();
                ResultDTO result = new ResultDTO();
                result.setTestId(test.getId());
                String resultValue = rdeLabOrderRequestDTO.getResult();
                result.setResultReported(resultValue);
                result.setResultReport(resultValue);
                result.setResultReportedBy(rdeLabOrderRequestDTO.getResultReportedBy());
                result.setAssayedBy(rdeLabOrderRequestDTO.getAssayedBy());
                result.setPcrLabName(rdeLabOrderRequestDTO.getPcrLabName());
                result.setPcrLabSampleNumber(rdeLabOrderRequestDTO.getPcrLabSampleNumber());
                result.setCheckedBy(rdeLabOrderRequestDTO.getCheckedBy());
                result.setApprovedBy(rdeLabOrderRequestDTO.getApprovedBy());
                result.setDateApproved(rdeLabOrderRequestDTO.getDateApproved());
                Person person = personRepository.findById((long) rdeLabOrderRequestDTO.getPatientId())
                        .orElseThrow(() -> new RuntimeException("patient not found"));
                checkAndUpdateIpt(test, resultValue, rdeLabOrderRequestDTO, person);
                try {
                    result.setDateSampleReceivedAtPcrLab(rdeLabOrderRequestDTO.getDateReceivedAtPcrLab().toLocalDate());
                }catch (Exception ignored){
                }
                try {
                    result.setDateResultReported(rdeLabOrderRequestDTO.getDateResultReceived());
                } catch (Exception ignored) {
                }
                try {
                    result.setDateAssayed(rdeLabOrderRequestDTO.getDateAssayedBy().atStartOfDay());
                } catch (Exception ignored) {
                }
                try {
                    result.setDateChecked(rdeLabOrderRequestDTO.getDateChecked().atStartOfDay());
                } catch (Exception ignored) {
                }
                try {
                    result.setDateResultReceived(rdeLabOrderRequestDTO.getDateResultReceived());
                } catch (Exception ignored) {
                }
                try {
                    result.setDateResultReported(rdeLabOrderRequestDTO.getDateResultReceived());
                } catch (Exception ignored) {
                }
                resultService.Save(result);

            }
        }
        return labDtoList;
    }

    private  void checkAndUpdateIpt(TestResponseDTO test, String resultValue, RDELabOrderRequestDTO rdeLabOrderRequestDTO, Person person) {
        List<Integer> testIdContainer = new ArrayList<>();
        testIdContainer.add(51);
        testIdContainer.add(65);
        testIdContainer.add(66);
        testIdContainer.add(73);
        if(testIdContainer.contains(test.getLabTestId()) &&
                (resultValue.equalsIgnoreCase("negative") || resultValue.equalsIgnoreCase("-"))){

            LocalDateTime sampleCollectionDateTime = rdeLabOrderRequestDTO.getSampleCollectionDate();
            LocalDate sampleCollectionDate =
                    sampleCollectionDateTime != null ?
                            sampleCollectionDateTime.toLocalDate() : null;
            labOrderRepository.updateEligibleForTPT(person.getUuid(), sampleCollectionDate);

        }
    }

    private String Generate_Random_ID() {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 7;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString().toUpperCase();
    }

    public List<RDELabOrderRequestDTO> UpdateRDELabTests(int orderId, List<RDELabOrderRequestDTO> labDtoList) {
        for(RDELabOrderRequestDTO dto:labDtoList){
            UpdateRDELabTest(orderId, dto);
        }
        return labDtoList;
    }

    public RDELabOrderRequestDTO UpdateRDELabTest(int orderId, RDELabOrderRequestDTO rdeTestDTO){
        TestDTO test = testService.FindById(rdeTestDTO.getId());
        Integer labTestId = test.getLabTestId();
        //test.setLabTestId(rdeTestDTO.getLabTestId());
        //test.setLabTestGroupId(rdeTestDTO.getLabTestGroupId());
        test.setViralLoadIndication(rdeTestDTO.getViralLoadIndication());
        test.setDescription(rdeTestDTO.getComments());
        if(rdeTestDTO.getResult() == null || rdeTestDTO.getResult().isEmpty() || rdeTestDTO.getResult().trim().isEmpty()) {
            test.setLabTestOrderStatus(SAMPLE_COLLECTED);
        }
        else{
            test.setLabTestOrderStatus(RESULT_REPORTED);
        }
        test.setLabOrderId(rdeTestDTO.getOrderId());
        test.setLabTestId(labTestId);
        testService.Update(orderId, test);
        SampleDTO sample = sampleService.FindByTestId(test.getId());
        sample.setDateSampleCollected(rdeTestDTO.getSampleCollectionDate());
        sample.setSampleCollectedBy(rdeTestDTO.getSampleCollectedBy());
        sample.setTestId(test.getId());
        sample.setSampleTypeId(rdeTestDTO.getSampleTypeId());
        sampleService.Save(rdeTestDTO.getLabNumber(), sample);

        //save result
        ResultDTO result = resultService.GetResultsByTestId(test.getId());
        result.setTestId(test.getId());
        result.setResultReported(rdeTestDTO.getResult());
        result.setResultReport(rdeTestDTO.getResult());
        result.setResultReportedBy(rdeTestDTO.getResultReportedBy());
        result.setAssayedBy(rdeTestDTO.getAssayedBy());
        result.setPcrLabName(rdeTestDTO.getPcrLabName());
        result.setPcrLabSampleNumber(rdeTestDTO.getPcrLabSampleNumber());
        result.setCheckedBy(rdeTestDTO.getCheckedBy());
        result.setResultReceivedBy(rdeTestDTO.getResultReportedBy());
        result.setApprovedBy(rdeTestDTO.getApprovedBy());
        result.setDateApproved(rdeTestDTO.getDateApproved());
        try {
            result.setDateSampleReceivedAtPcrLab(rdeTestDTO.getDateReceivedAtPcrLab().toLocalDate());
        }catch (Exception ignored){
        }
        try {
            result.setDateResultReported(rdeTestDTO.getDateResultReceived());
        } catch (Exception ignored) {
        }
        try {
            result.setDateAssayed(rdeTestDTO.getDateAssayedBy().atStartOfDay());
        } catch (Exception ignored) {
        }
        try {
            result.setDateChecked(rdeTestDTO.getDateChecked().atStartOfDay());
        } catch (Exception ignored) {
        }
        try {
            result.setDateResultReceived(rdeTestDTO.getDateResultReceived());
        } catch (Exception ignored) {
        }
        try {
            result.setDateResultReported(rdeTestDTO.getDateResultReceived());
        } catch (Exception ignored) {
        }
        resultService.Save(result);

        return rdeTestDTO;
    }

    public String DeleteRDELabTest(int id){
        try {
            SampleDTO sample = sampleService.FindByTestId(id);
            if (sample != null) {
                sampleService.Delete(sample.getId());
            }
        }
        catch (Exception ignored) {
        }

        try{
            ResultDTO result = resultService.GetResultsByTestId(id);
            if (result != null) {
                resultService.Delete(result.getId());
            }
        }
        catch (Exception ignored) {
        }

        try{
            TestDTO test = testService.FindById(id);
            labOrderService.Delete(test.getLabOrderId());
        }
        catch (Exception ignored) {
        }

        testService.Delete(id);

        return id+" deleted successfully";
    }

    public List<RDELabOrderResponseDTO> GetRDEOrderById(Integer id){
        PatientLabOrderDTO order = labOrderService.GetOrderById(id);
        log.info("vl data {}", order);
        List<RDELabOrderResponseDTO> testDTOList = new ArrayList<>();
        for(TestResponseDTO dto:order.getLabOrder().getTests()
                .stream().filter(x -> x.getArchived().equals(0)).collect(Collectors.toList())){
            RDELabOrderResponseDTO testDTO = new RDELabOrderResponseDTO();
            testDTO.setLabTestId(dto.getLabTestId());
            testDTO.setLabNumber(dto.getLabNumber());
            testDTO.setPatientId(order.getPatientId());
            testDTO.setVisitId(order.getLabOrder().getVisitId());
            testDTO.setOrderId(order.getLabOrder().getId());
            testDTO.setId(dto.getId());
            testDTO.setComments(dto.getDescription());
            testDTO.setViralLoadIndication(dto.getViralLoadIndication());
            testDTO.setLabTestGroupId(dto.getLabTestGroupId());
            try {
                testDTO.setDateOrderBy(dto.getOrderDate().toLocalDate());
            } catch (Exception ignored) {
            }
            testDTO.setClinicianName(order.getLabOrder().getUserId());
            testDTO.setLabTestOrderStatus(dto.getLabTestOrderStatus());
            testDTO.setLabTestGroupName(labOrderService.GetNameById(dto.getLabTestGroupId(), LAB_TEST_GROUP));
            testDTO.setLabTestName(labOrderService.GetNameById(dto.getLabTestId(), LAB_TEST));
            testDTO.setViralLoadIndicationName(labOrderService.GetNameById(dto.getViralLoadIndication(), APPLICATION_CODE_SET));
            testDTO.setLabTestOrderStatusName(labOrderService.GetNameById(dto.getLabTestOrderStatus(), LAB_ORDER_STATUS));
            if(!dto.getSamples().isEmpty()) {
                testDTO.setOrderBy(dto.getSamples().get(0).getSampleCollectedBy());
                testDTO.setSampleCollectedBy(dto.getSamples().get(0).getSampleCollectedBy());
                testDTO.setSampleCollectionDate(dto.getSamples().get(0).getDateSampleCollected());
                testDTO.setCollectedBy(dto.getSamples().get(0).getSampleCollectedBy());
                testDTO.setSampleTypeId(dto.getSamples().get(0).getSampleTypeId());
                testDTO.setSampleNumber(dto.getSamples().get(0).getSampleNumber());
                testDTO.setSampleLoggedRemotely(dto.getSamples().get(0).getSampleLoggedRemotely());
                testDTO.setDateSampleLoggedRemotely(dto.getSamples().get(0).getDateSampleLoggedRemotely());
                try {
                    testDTO.setDateCollectedBy(dto.getSamples().get(0).getDateSampleCollected().toLocalDate());
                } catch (Exception ignored) {
                }
                testDTO.setComments(dto.getSamples().get(0).getCommentSampleCollected());
                testDTO.setSampleTypeName(labOrderService.GetNameById(dto.getSamples().get(0).getSampleTypeId(), SAMPLE_TYPE));
            }
            if(!dto.getResults().isEmpty()) {
                testDTO.setResult(dto.getResults().get(0).getResultReported());
                testDTO.setResultReportedBy(dto.getResults().get(0).getResultReportedBy());
                testDTO.setAssayedBy(dto.getResults().get(0).getAssayedBy());
                testDTO.setPcrLabSampleNumber(dto.getResults().get(0).getPcrLabSampleNumber());
                testDTO.setCheckedBy(dto.getResults().get(0).getCheckedBy());
                testDTO.setResultReportedBy(dto.getResults().get(0).getResultReportedBy());
                testDTO.setApprovedBy(dto.getResults().get(0).getApprovedBy());
                testDTO.setDateApproved(dto.getResults().get(0).getDateApproved());
                testDTO.setPcrLabName(dto.getResults().get(0).getPcrLabName());
                try {
                    testDTO.setDateReceivedAtPcrLab(dto.getResults().get(0)
                            .getDateSampleReceivedAtPcrLab().atStartOfDay());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateResultReceived(dto.getResults().get(0).getDateResultReceived());
                    testDTO.setDateResultReported(dto.getResults().get(0).getDateResultReported().toLocalDate());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateAssayed(dto.getResults().get(0).getDateAssayed().toLocalDate());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateAssayedBy(dto.getResults().get(0).getDateAssayed().toLocalDate());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateResultReceived(dto.getResults().get(0).getDateResultReceived());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateChecked(dto.getResults().get(0).getDateChecked().toLocalDate());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateAssayed(dto.getResults().get(0).getDateAssayed().toLocalDate());
                } catch (Exception ignored) {
                }
                try {
                    testDTO.setDateSampleLoggedRemotely(dto.getResults().get(0).getDateSampleReceivedAtPcrLab());
                } catch (Exception ignored) {
                }
            }
            testDTOList.add(testDTO);
        }
        Log.info(testDTOList.toString());
        return testDTOList;
    }

    public List<RDELabOrderResponseDTO> GetRDEOrderByPatientId(Integer patientId, int orderType){
        List<PatientLabOrderDTO> orders = labOrderService.GetAllOrdersByPatientId(patientId);
        List<RDELabOrderResponseDTO> testDTOList = new ArrayList<>();

        for(PatientLabOrderDTO order : orders){
                List<RDELabOrderResponseDTO> rdeTestDTOList = GetRDEOrderById(order.getLabOrder().getId());
                testDTOList.addAll(rdeTestDTOList);
        }

        testDTOList.sort(Comparator.comparing(RDELabOrderResponseDTO::getOrderId));
        Collections.reverse(testDTOList);

        List<RDELabOrderResponseDTO> filteredList;
        if(orderType==VL_ORDER){
            filteredList = testDTOList.stream().filter(x -> x.getLabTestName().equals("Viral Load")).collect(Collectors.toList());
        }
        else if(orderType==LAB_ORDER){
            filteredList = testDTOList.stream().filter(x -> !x.getLabTestName().equals("Viral Load")).collect(Collectors.toList());
        }
        else{
            filteredList = testDTOList;
        }

        return filteredList;
    }

    public RDELabOrderResponseDTO GetLatestVL(Integer patientId){
        List<RDELabOrderResponseDTO> labTests = GetRDEOrderByPatientId(patientId, VL_ORDER);
        List<RDELabOrderResponseDTO> viralLoads = labTests.stream().filter(x -> x.getLabTestName().equals("Viral Load")
                        && x.getResult() != null && x.getDateResultReceived() != null)
                .sorted(Comparator.comparing(RDELabOrderResponseDTO::getDateResultReceived)).collect(Collectors.toList());
        return viralLoads.get(viralLoads.size()-1);
    }
}
