package org.lamisplus.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import org.audit4j.core.util.Log;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.lamisplus.modules.laboratory.domain.dto.*;
import org.lamisplus.modules.laboratory.domain.entity.LabOrder;
import org.lamisplus.modules.laboratory.domain.entity.PendingOrder;
import org.lamisplus.modules.laboratory.domain.entity.Test;
import org.lamisplus.modules.laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.laboratory.repository.*;
import org.lamisplus.modules.laboratory.utility.JsonNodeTransformer;
import org.lamisplus.modules.base.domain.dto.PageDTO;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.security.SecurityUtils;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.lamisplus.modules.laboratory.utility.LabUtils.*;

@Service
@RequiredArgsConstructor
public class LabOrderService {
    private final LabOrderRepository labOrderRepository;
    private final SampleRepository sampleRepository;
    private final ResultRepository resultRepository;
    private final LabTestGroupService labTestGroupService;
    private final LabTestService labTestService;
    private final CodesetRepository codesetRepository;
    private final PendingOrderRepository pendingOrderRepository;

    private final LabMapper labMapper;
    private final PersonService personService;
    private  final UserService userService;
    private final PersonRepository personRepository;
    private final SampleTypeRepository sampleTypeRepository;
    private final JsonNodeTransformer jsonNodeTransformer;

    public LabOrderResponseDTO Save(LabOrderDTO labOrderDTO){
        try {
            Person person = personRepository.findById((long) labOrderDTO.getPatientId()).orElse(null);

            LabOrder labOrder = labMapper.toLabOrder(labOrderDTO);
            //labOrder.setUserId(SecurityUtils.getCurrentUserLogin().orElse(""));
            labOrder.setUuid(UUID.randomUUID().toString());
            assert person != null;
            labOrder.setPatientUuid(person.getUuid());
            labOrder.setFacilityId(getCurrentUserOrganization());

            for (Test test : labOrder.getTests()) {
                test.setUuid(UUID.randomUUID().toString());
                test.setLabTestOrderStatus(PENDING_SAMPLE_COLLECTION);
                test.setPatientId(labOrder.getPatientId());
                test.setFacilityId(getCurrentUserOrganization());
                test.setPatientUuid(person.getUuid());
            }

            LogInfo("LAB_ORDER", labOrderDTO);
            return labMapper.toLabOrderResponseDto(labOrderRepository.save(labOrder));
        }
        catch(Exception e){
            Log.error(e);
            return null;
        }
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public LabOrderResponseDTO Update(int order_id, LabOrderDTO labOrderDTO){
        LabOrder labOrder = labMapper.toLabOrder(labOrderDTO);
        labOrder.setUserId(SecurityUtils.getCurrentUserLogin().orElse(""));
        for (Test test:labOrder.getTests()){
            test.setLabTestOrderStatus(PENDING_SAMPLE_COLLECTION);
        }
        return labMapper.toLabOrderResponseDto(labOrderRepository.save(labOrder));
    }

    public String Delete(Integer id){
        LabOrder labOrder = labOrderRepository.findById(id).orElse(null);
        Log.info("delete here "+id);
        //labOrderRepository.delete(labOrder);
        labOrder.setArchived(1);
        labOrderRepository.save(labOrder);
        Log.info(labOrder);
        return id + " deleted successfully";
    }

    public List<PatientLabOrderDTO> GetAllOrdersByPatientId(int patient_id){
        return  AppendPatientDetails(labOrderRepository.findAllByPatientIdAndFacilityIdAndArchived(patient_id, getCurrentUserOrganization(), 0));
    }

    public PatientLabOrderDTO GetOrderById(int id){
        List<LabOrder> orders =  new ArrayList<>();
        orders.add(labOrderRepository.findByIdAndArchived(id, 0).orElse(null));
        List<PatientLabOrderDTO> patientLabOrderDTOS = AppendPatientDetails(orders);
        return patientLabOrderDTOS.get(0);
    }

    public List<PatientLabOrderDTO> GetAllOrdersByVisitId(int visit_id){
        return AppendPatientDetails(labOrderRepository.findAllByVisitIdAndFacilityIdAndArchived(visit_id, getCurrentUserOrganization(), 0));
    }

    public List<PatientLabOrderDTO> GetAllLabOrders(){
        List<LabOrder> orders = labOrderRepository.findAllByFacilityIdAndArchived(getCurrentUserOrganization(), 0);
        return AppendPatientDetails(orders);
    }

    public LabOrderListMetaDataDTO GetOrdersPendingSampleCollection(String searchParam, int pageNo, int pageSize){
        if(searchParam==null || searchParam.equals("*")) {
            Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
            Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleCollection(paging, getCurrentUserOrganization());
            return getLabOrderListMetaDataDto(searchParam, pendingOrders);
        }
        else{
            List<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleCollection(getCurrentUserOrganization());
            return getLabOrderListMetaDataDtoFromSearch(searchParam, pendingOrders);
        }
    }

    public LabOrderListMetaDataDTO GetOrdersPendingSampleVerification(String searchParam, int pageNo, int pageSize) {
        if (searchParam == null || searchParam.equals("*")) {
            Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
            Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleVerification(paging, getCurrentUserOrganization());
            return getLabOrderListMetaDataDto(searchParam, pendingOrders);
        } else {
            List<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleCollection(getCurrentUserOrganization());
            return getLabOrderListMetaDataDtoFromSearch(searchParam, pendingOrders);
        }
    }

    public LabOrderListMetaDataDTO GetOrdersPendingResults(String searchParam, int pageNo, int pageSize) {
        if (searchParam == null || searchParam.equals("*")) {
            Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
            Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingResults(paging, getCurrentUserOrganization());
            return getLabOrderListMetaDataDto(searchParam, pendingOrders);
        } else {
            List<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingResults(getCurrentUserOrganization());
            return getLabOrderListMetaDataDtoFromSearch(searchParam, pendingOrders);
        }
    }

    @Nullable
    private LabOrderListMetaDataDTO getLabOrderListMetaDataDto(String searchParam, Page<PendingOrder> pendingOrders) {
        List<PendingOrderDTO> pendingOrderList = getPendingOrderDTOS(searchParam,
                labMapper.toPendingOrderDtoList(new ArrayList<>(pendingOrders.getContent())));

        if (pendingOrders.hasContent()) {
            PageDTO pageDTO = this.generatePagination(pendingOrders);
            LabOrderListMetaDataDTO labOrderListMetaDataDto = new LabOrderListMetaDataDTO();
            labOrderListMetaDataDto.setTotalRecords(pageDTO.getTotalRecords());
            labOrderListMetaDataDto.setPageSize(pageDTO.getPageSize());
            labOrderListMetaDataDto.setTotalPages(pageDTO.getTotalPages());
            labOrderListMetaDataDto.setCurrentPage(pageDTO.getPageNumber());

            labOrderListMetaDataDto.setRecords(pendingOrderList);
            return labOrderListMetaDataDto;
        }

        return new LabOrderListMetaDataDTO();
    }

    @Nullable
    private LabOrderListMetaDataDTO getLabOrderListMetaDataDtoFromSearch(String searchParam, List<PendingOrder> pendingOrders) {
        List<PendingOrderDTO> pendingOrderList = getPendingOrderDTOS(searchParam,
                labMapper.toPendingOrderDtoList(pendingOrders));
        Page<PendingOrderDTO> patientList = new PageImpl<>(pendingOrderList);
        PageDTO pageDTO;

        if (patientList.hasContent()) {
            pageDTO = this.generatePagination(patientList);
            LabOrderListMetaDataDTO labOrderListMetaDataDto = new LabOrderListMetaDataDTO();
            labOrderListMetaDataDto.setTotalRecords(pageDTO.getTotalRecords());
            labOrderListMetaDataDto.setPageSize(pageDTO.getPageSize());
            labOrderListMetaDataDto.setTotalPages(pageDTO.getTotalPages());
            labOrderListMetaDataDto.setCurrentPage(pageDTO.getPageNumber());

            labOrderListMetaDataDto.setRecords(pendingOrderList);
            return labOrderListMetaDataDto;
        }

        return new LabOrderListMetaDataDTO();
    }

    public PageDTO generatePagination(Page page) {
        long totalRecords = page.getTotalElements();
        int pageNumber = page.getNumber();
        int pageSize = page.getSize();
        int totalPages = page.getTotalPages();
        return PageDTO.builder().totalRecords(totalRecords)
                .pageNumber(pageNumber)
                .pageSize(pageSize)
                .totalPages(totalPages).build();
    }

    @NotNull
    private List<PendingOrderDTO> getPendingOrderDTOS(String searchParam, List<PendingOrderDTO> pendingOrderList) {
        for (PendingOrderDTO dto: pendingOrderList) {
            PersonResponseDto personResponseDTO = personService.getPersonById((long) dto.getPatientId());
            dto.setPatientAddress(jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(), "address", "city", true));
            dto.setPatientDob(personResponseDTO.getDateOfBirth());
            dto.setPatientGender(jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null, "display", false));
            dto.setPatientFirstName(personResponseDTO.getFirstName());
            dto.setPatientId(dto.getPatientId());
            dto.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getIdentifier(), "identifier", "value", true));
            dto.setPatientLastName(personResponseDTO.getSurname());
            dto.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getContactPoint(),"contactPoint", "value", true));
        }

        if(searchParam==null || searchParam.equals("*")) {
            return pendingOrderList;
        }
        else{
//            List<PendingOrderDTO> filteredList = new ArrayList<>();
//            for(PendingOrderDTO dto: pendingOrderList){
//                if(dto.getPatientFirstName().contains(searchParam) ||
//                        dto.getPatientHospitalNumber().contains(searchParam) ||
//                dto.getPatientLastName().contains(searchParam)){
//                    filteredList.add(dto);
//                }
//            }


            return pendingOrderList.stream().filter(x -> x.getPatientFirstName().contains(searchParam)
                            || x.getPatientLastName().contains(searchParam)
                            || x.getPatientHospitalNumber().contains(searchParam))
                    .sorted(Comparator.comparing(PendingOrderDTO::getOrderId)).collect(Collectors.toList());
        }
    }

    public LabOrderResponseDTO AppendAdditionalTestDetails(LabOrderResponseDTO labOrderDTO){
        try {
            List<TestResponseDTO> testDTOList = UpdateTestResponses(labOrderDTO.getTests());
            for (TestResponseDTO testDTO : testDTOList) {
                List<SampleResponseDTO> sampleDTOList = labMapper.toSampleResponseDtoList(sampleRepository.findAllByTestIdAndArchived(testDTO.getId(), 0));

                for (SampleResponseDTO sampleResponseDTO : sampleDTOList) {
                    sampleResponseDTO.setSampleTypeName(GetNameById(sampleResponseDTO.getSampleTypeId(), SAMPLE_TYPE));
                    sampleResponseDTO.setLabNumber(testDTO.getLabNumber());
                }

                List<ResultDTO> resultDTOList = labMapper.toResultDtoList(resultRepository.findAllByTestIdAndArchived(testDTO.getId(), 0));

                testDTO.setSamples(sampleDTOList);
                testDTO.setResults(resultDTOList);
                testDTO.setOrderDate(labOrderDTO.getOrderDate());
            }
            labOrderDTO.setTests(testDTOList);
            return labOrderDTO;
        }catch(Exception ex) {
            Log.info(ex);
            return labOrderDTO;
        }
    }

    private List<PatientLabOrderDTO> AppendPatientDetails(List<LabOrder> orders){
        List<PatientLabOrderDTO> patientLabOrderDTOS = new ArrayList<>();

        for (LabOrder order: orders) {
            PersonResponseDto personResponseDTO = personService.getPersonById((long) order.getPatientId());
            Log.info("PERSON: "+personResponseDTO);
            PatientLabOrderDTO dto = new PatientLabOrderDTO();
            dto.setPatientAddress(jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(), "address", "city", true));
            dto.setPatientDob(personResponseDTO.getDateOfBirth());
            dto.setPatientGender(jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null, "display", false));
            dto.setPatientSex(personResponseDTO.getSex());
            dto.setPatientFirstName(personResponseDTO.getFirstName());
            dto.setPatientId(order.getPatientId());
            dto.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getIdentifier(), "identifier", "value", true));
            dto.setPatientLastName(personResponseDTO.getSurname());
            dto.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getContactPoint(),"contactPoint", "value", true));
            Log.info("HERE 1: "+personResponseDTO);
            dto.setLabOrder(AppendAdditionalTestDetails(labMapper.toLabOrderResponseDto(order)));

            patientLabOrderDTOS.add(dto);
        }

        Log.info("ORDER: "+patientLabOrderDTOS);
        return patientLabOrderDTOS;
    }

    private List<TestResponseDTO> UpdateTestResponses(List<TestResponseDTO> testResponseDTOList) {
        for(TestResponseDTO testResponseDTO:testResponseDTOList){
            testResponseDTO.setLabTestName(GetNameById(testResponseDTO.getLabTestId(), LAB_TEST));
            testResponseDTO.setLabTestGroupName(GetNameById(testResponseDTO.getLabTestGroupId(), LAB_TEST_GROUP));
            testResponseDTO.setUnitMeasurement(GetNameById(testResponseDTO.getLabTestId(), LAB_TEST_UNITS));
            testResponseDTO.setOrderPriorityName(GetNameById(testResponseDTO.getOrderPriority(), APPLICATION_CODE_SET));
            testResponseDTO.setLabTestOrderStatusName(GetNameById(testResponseDTO.getLabTestOrderStatus(), LAB_ORDER_STATUS));
            testResponseDTO.setViralLoadIndicationName(GetNameById(testResponseDTO.getViralLoadIndication(), APPLICATION_CODE_SET));
        }

        return testResponseDTOList;
    }

    public String GetNameById(Integer id, Integer itemType){
        try {
            if (Objects.equals(itemType, APPLICATION_CODE_SET)) {
                if (id > 0) {
                    return Objects.requireNonNull(codesetRepository.findById(id).orElse(null)).getDisplay();
                } else {
                    return "";
                }
            } else if (Objects.equals(itemType, LAB_TEST)) {
                return labTestService.FindLabTestNameById(id);
            } else if (Objects.equals(itemType, LAB_TEST_UNITS)) {
                return labTestService.FindLabTestMeasurementById(id);
            } else if (Objects.equals(itemType, LAB_TEST_GROUP)) {
                return labTestGroupService.FindLabTestGroupNameById(id);
            } else if (Objects.equals(itemType, LAB_ORDER_STATUS)) {
                if (Objects.equals(id, PENDING_SAMPLE_COLLECTION)) {
                    return "Pending Sample Collection";
                }
                else if (Objects.equals(id, SAMPLE_COLLECTED)) {
                    return "Sample collected";
                }
                else if (Objects.equals(id, SAMPLE_TRANSFERRED)) {
                    return "Sample Transferred";
                }
                else if (Objects.equals(id, SAMPLE_VERIFIED)) {
                    return "Sample Verified";
                }
                else if (Objects.equals(id, SAMPLE_REJECTED)) {
                    return "Sample Rejected";
                }
                else if (Objects.equals(id, RESULT_REPORTED)) {
                    return "Result Reported";
                }
                else {
                    return "";
                }
            } else if (Objects.equals(itemType, SAMPLE_TYPE)) {
                return Objects.requireNonNull(sampleTypeRepository.findById(id).orElse(null)).getSampleTypeName();
            }
            else {
                return "";
            }
        }
        catch (Exception exception){
            return "";
        }
    }

    public List<HistoricalResultResponseDTO> GetHistoricalResultsByPatientId(Integer patientId){
        List<LabOrderResponseDTO> orders =  labMapper.toLabOrderResponseDtoList(labOrderRepository.findAllByPatientIdAndFacilityIdAndArchived(patientId, getCurrentUserOrganization(), 0));
        List<HistoricalResultResponseDTO> historicalResults = new ArrayList<>();

        for(LabOrderResponseDTO order: orders){
            LabOrderResponseDTO updated_order = AppendAdditionalTestDetails(order);

            for(TestResponseDTO test: updated_order.getTests()){
                HistoricalResultResponseDTO result = new HistoricalResultResponseDTO();

                result.setId(test.getId());
                result.setOrderId(updated_order.getId());
                result.setPatientId(patientId);
                result.setOrderDate(updated_order.getOrderDate());
                result.setLabTestName(test.getLabTestName());
                result.setGroupName(test.getLabTestGroupName());


                if((long) test.getSamples().size() > 0) {
                    result.setDateSampleCollected(test.getSamples().get(0).getDateSampleCollected());
                    result.setDateSampleVerified(test.getSamples().get(0).getDateSampleVerified());
                    result.setSampleTypeName(test.getSamples().get(0).getSampleTypeName());
                }
                if((long) test.getResults().size() > 0) {
                    result.setResultReported(test.getResults().get(0).getResultReported());
                    result.setDateResultReported(test.getResults().get(0).getDateResultReported());
                }

                PersonResponseDto personResponseDTO = personService.getPersonById((long) updated_order.getPatientId());
                result.setPatientAddress(jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(), "address", "city", true));
                result.setPatientDob(personResponseDTO.getDateOfBirth());
                result.setPatientGender(jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null, "display", false));
                result.setPatientFirstName(personResponseDTO.getFirstName());
                result.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getIdentifier(), "identifier", "value", true));
                result.setPatientLastName(personResponseDTO.getSurname());
                result.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getContactPoint(),"contactPoint", "value", true));

                historicalResults.add(result);
            }
        }

        return historicalResults;
    }
}
