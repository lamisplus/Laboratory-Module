package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.*;
import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.lamisplus.modules.Laboratory.repository.SampleRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class RDELabTestService {
    private final LabOrderService labOrderService;
    private final TestService testService;
    private final SampleService sampleService;
    private final SampleRepository sampleRepository;
    private final ResultService resultService;
    public static final int LAB_ORDER = 1;
    public static final int VL_ORDER = 2;
    public static final int ALL_ORDER = 3;

    //RDE
    public List<RDELabOrderRequestDTO> SaveRDELabTests(List<RDELabOrderRequestDTO> labDtoList){
        //Save order
        LabOrderDTO labOrderDTO=new LabOrderDTO();
        List<TestDTO> tests = new ArrayList<>();

        RDELabOrderRequestDTO rdeTestDTO = labDtoList.get(0);
        labOrderDTO.setOrderDate(rdeTestDTO.getSampleCollectionDate());
        labOrderDTO.setPatientId(rdeTestDTO.getPatientId());
        labOrderDTO.setVisitId(0); //TODO get visit ID
        if(rdeTestDTO.getClinicianName()==null){
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
                log.info("Sample-collected");
            }
            else{
                test.setLabTestOrderStatus(RESULT_REPORTED);
                log.info("result-reported");
            }

            tests.add(test);
        }

        labOrderDTO.setTests(tests);
        LabOrderResponseDTO responseDTO = labOrderService.Save(labOrderDTO);

        //save sample and result
        for(TestResponseDTO test:responseDTO.getTests()){
            RDELabOrderRequestDTO dto = labDtoList.stream().filter(submittedTest -> submittedTest.getLabTestId()==test.getLabTestId()).findFirst().orElse(null);
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
            log.info(sample.toString());
            SampleDTO dto1 = sampleService.Save(dto.getLabNumber(), sample);

            //Save verification info
            Sample verifiedSample = sampleRepository.findById(dto1.getId()).orElse(null);
            assert verifiedSample != null;
            verifiedSample.setDateSampleVerified(dto.getSampleCollectionDate());
            verifiedSample.setCommentSampleVerified("Sample verified");
            verifiedSample.setSampleVerifiedBy(dto.getSampleCollectedBy());
            log.info(verifiedSample.toString());
            sampleRepository.save(verifiedSample);

            //save result
            if(rdeTestDTO.getResult() != null && !rdeTestDTO.getResult().isEmpty()) {
                log.info(rdeTestDTO.toString());
                log.info("C");
                ResultDTO result = new ResultDTO();
                result.setTestId(test.getId());
                result.setResultReported(rdeTestDTO.getResult());
                result.setResultReport(rdeTestDTO.getResult());
                result.setResultReportedBy(rdeTestDTO.getResultReportedBy());
                result.setAssayedBy(rdeTestDTO.getAssayedBy());
                result.setPcrLabName(rdeTestDTO.getPcrLabName());
                result.setPcrLabSampleNumber(rdeTestDTO.getPcrLabSampleNumber());
                result.setCheckedBy(rdeTestDTO.getCheckedBy());
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
            }
        }

        return labDtoList;
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
        log.info("ORDER ID: "+rdeTestDTO.getOrderId());
        log.info(test.toString());
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
        testService.Delete(id);
        SampleDTO sample = sampleService.FindByTestId(id);
        sampleService.Delete(sample.getId());
        ResultDTO result = resultService.GetResultsByTestId(id);
        resultService.Delete(result.getId());
        return id+" deleted successfully";
    }

    public List<RDELabOrderResponseDTO> GetRDEOrderById(Integer id){
        PatientLabOrderDTO order = labOrderService.GetOrderById(id);
        List<RDELabOrderResponseDTO> testDTOList = new ArrayList<>();

        log.info("Aa");
        for(TestResponseDTO dto:order.getLabOrder().getTests()){
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

            log.info("bb");
            if(dto.getSamples().size()>0) {
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

            log.info("cc");
            if(dto.getResults().size()>0) {
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
                    testDTO.setDateReceivedAtPcrLab(dto.getResults().get(0).getDateSampleReceivedAtPcrLab().atStartOfDay());
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

            log.info("ee");
            testDTOList.add(testDTO);
        }
        log.info(testDTOList.toString());
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
