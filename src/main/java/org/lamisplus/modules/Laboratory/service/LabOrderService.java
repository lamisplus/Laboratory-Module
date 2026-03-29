package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import org.audit4j.core.util.Log;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.lamisplus.modules.Laboratory.domain.dto.*;
import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.lamisplus.modules.Laboratory.domain.entity.PendingOrder;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.*;
import org.lamisplus.modules.Laboratory.utility.JsonNodeTransformer;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.*;


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
        Log.info("=== Starting Lab Order Save Process ===");
        Log.info("Patient ID: " + labOrderDTO.getPatientId());
        Log.info("Visit ID: " + labOrderDTO.getVisitId());

        if (labOrderDTO.getTests() == null || labOrderDTO.getTests().isEmpty()) {
            throw new RuntimeException("Tests list cannot be null or empty");
        }

        Person person = personRepository.findById((long) labOrderDTO.getPatientId()).orElse(null);
        if (person == null) {
            throw new RuntimeException("Patient not found with ID: " + labOrderDTO.getPatientId());
        }
        Log.info("Found person: " + person.getUuid());

        LabOrder labOrder = new LabOrder();
        labOrder.setUuid(UUID.randomUUID().toString());
        labOrder.setPatientId(labOrderDTO.getPatientId());
        labOrder.setVisitId(labOrderDTO.getVisitId());
        labOrder.setOrderDate(labOrderDTO.getOrderDate());
        labOrder.setPatientUuid(person.getUuid());
        labOrder.setFacilityId(getCurrentUserOrganization());
        labOrder.setArchived(0);
        labOrder.setUserId(labOrderDTO.getUserId());

        if (labOrderDTO.getOrderedDate() != null) {
            labOrder.setOrderedDate(labOrderDTO.getOrderedDate());
        }
        if (labOrderDTO.getLabOrderIndication() != null) {
            labOrder.setLabOrderIndication(labOrderDTO.getLabOrderIndication());
        }

        Log.info("Created LabOrder entity with UUID: " + labOrder.getUuid());

        List<Test> tests = new ArrayList<>();
        for (TestDTO testDTO : labOrderDTO.getTests()) {
            Test test = new Test();

            test.setUuid(UUID.randomUUID().toString());
            test.setPatientId(labOrderDTO.getPatientId());
            test.setLabTestId(testDTO.getLabTestId());
            test.setDescription(testDTO.getDescription());
            test.setLabTestGroupId(testDTO.getLabTestGroupId());
            test.setOrderPriority(testDTO.getOrderPriority());
            test.setLabTestOrderStatus(PENDING_SAMPLE_COLLECTION);
            test.setPatientUuid(person.getUuid());
            test.setFacilityId(getCurrentUserOrganization());
            test.setArchived(0);

            if (testDTO.getClinicalNote() != null) {
                test.setClinicalNote(testDTO.getClinicalNote());
            }
            if (testDTO.getLabNumber() != null) {
                test.setLabNumber(testDTO.getLabNumber());
            }
            if (testDTO.getViralLoadIndication() != null) {
                test.setViralLoadIndication(testDTO.getViralLoadIndication());
            } else {
                test.setViralLoadIndication(0);
            }

            tests.add(test);
            Log.info("Created test with UUID: " + test.getUuid() +
                    ", LabTestId: " + test.getLabTestId() +
                    ", GroupId: " + test.getLabTestGroupId());
        }

        labOrder.setTests(tests);

        Log.info("About to save lab order with " + tests.size() + " tests");

        LabOrder savedLabOrder = labOrderRepository.save(labOrder);

        if (savedLabOrder == null || savedLabOrder.getId() == null) {
            throw new RuntimeException("Failed to save lab order - repository returned null or invalid result");
        }

        Log.info("Successfully saved lab order with ID: " + savedLabOrder.getId());
        Log.info("Saved " + (savedLabOrder.getTests() != null ? savedLabOrder.getTests().size() : 0) + " tests");

        LabOrderResponseDTO response = labMapper.toLabOrderResponseDto(savedLabOrder);
        if (response == null) {
            throw new RuntimeException("Failed to create response DTO");
        }

        Log.info("Successfully created response DTO with ID: " + response.getId());
        Log.info("=== Lab Order Save Process Completed Successfully ===");

        return response;

    } catch(Exception e){
        Log.error("Exception in Save method: " + e.getMessage(), e);
        throw new RuntimeException("Failed to save lab order: " + e.getMessage(), e);
    }
}

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public LabOrderResponseDTO Update(int order_id, LabOrderDTO labOrderDTO){
        // First, find the existing lab order
        LabOrder existingLabOrder = labOrderRepository.findById(order_id)
            .orElseThrow(() -> new RuntimeException("Lab order with id " + order_id + " not found"));
        
        // Update the existing lab order properties directly
        existingLabOrder.setPatientId(labOrderDTO.getPatientId());
        existingLabOrder.setVisitId(labOrderDTO.getVisitId());
        existingLabOrder.setOrderDate(labOrderDTO.getOrderDate());
        existingLabOrder.setUserId(labOrderDTO.getUserId() != null ? labOrderDTO.getUserId() : SecurityUtils.getCurrentUserLogin().orElse(""));
        
        if (labOrderDTO.getOrderedDate() != null) {
            existingLabOrder.setOrderedDate(labOrderDTO.getOrderedDate());
        }
        if (labOrderDTO.getLabOrderIndication() != null) {
            existingLabOrder.setLabOrderIndication(labOrderDTO.getLabOrderIndication());
        }
        
        // Handle tests properly - update existing tests and add new ones
        if (labOrderDTO.getTests() != null) {
            List<Test> updatedTests = new ArrayList<>();
            
            for (TestDTO testDTO : labOrderDTO.getTests()) {
               
                Test existingTest = existingLabOrder.getTests().stream()
                    .filter(test -> test.getLabTestId().equals(testDTO.getLabTestId()))
                    .findFirst()
                    .orElse(null);
                
                if (existingTest != null) {
                    
                    existingTest.setDescription(testDTO.getDescription());
                    existingTest.setLabTestGroupId(testDTO.getLabTestGroupId());
                    existingTest.setOrderPriority(testDTO.getOrderPriority());
                    existingTest.setLabTestOrderStatus(PENDING_SAMPLE_COLLECTION);
                    
                    if (testDTO.getClinicalNote() != null) {
                        existingTest.setClinicalNote(testDTO.getClinicalNote());
                    }
                    if (testDTO.getLabNumber() != null) {
                        existingTest.setLabNumber(testDTO.getLabNumber());
                    }
                    if (testDTO.getViralLoadIndication() != null) {
                        existingTest.setViralLoadIndication(testDTO.getViralLoadIndication());
                    }
                    
                    updatedTests.add(existingTest);
                } else {
                   
                    Test newTest = new Test();
                    newTest.setUuid(UUID.randomUUID().toString());
                    newTest.setPatientId(labOrderDTO.getPatientId());
                    newTest.setLabTestId(testDTO.getLabTestId());
                    newTest.setDescription(testDTO.getDescription());
                    newTest.setLabTestGroupId(testDTO.getLabTestGroupId());
                    newTest.setOrderPriority(testDTO.getOrderPriority());
                    newTest.setLabTestOrderStatus(PENDING_SAMPLE_COLLECTION);
                    newTest.setLabOrderId(order_id);
                    newTest.setFacilityId(getCurrentUserOrganization());
                    newTest.setArchived(0);
                    
                    if (testDTO.getClinicalNote() != null) {
                        newTest.setClinicalNote(testDTO.getClinicalNote());
                    }
                    if (testDTO.getLabNumber() != null) {
                        newTest.setLabNumber(testDTO.getLabNumber());
                    }
                    if (testDTO.getViralLoadIndication() != null) {
                        newTest.setViralLoadIndication(testDTO.getViralLoadIndication());
                    } else {
                        newTest.setViralLoadIndication(0);
                    }
                    
                    updatedTests.add(newTest);
                }
            }
            
            existingLabOrder.setTests(updatedTests);
        }
        
        
        LabOrder savedLabOrder = labOrderRepository.save(existingLabOrder);
        return labMapper.toLabOrderResponseDto(savedLabOrder);
    }

    public String Delete(Integer id){
        LabOrder labOrder = labOrderRepository.findById(id).orElse(null);
        //labOrderRepository.delete(labOrder);
        labOrder.setArchived(1);
        labOrderRepository.save(labOrder);
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

    public List<PatientLabOrderDTO> GetAllLabOrders(int pageNo, int pageSize){
        // Use Spring Data pagination
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<LabOrder> ordersPage = labOrderRepository.findAllByFacilityIdAndArchived(
                getCurrentUserOrganization(), 0, pageable);
        return AppendPatientDetails(ordersPage.getContent());
    }

    /**
     * More efficient method that fetches patient data directly from database
     * instead of making individual API calls
     */
    public Map<String, Object> GetAllLabOrdersOptimized(int pageNo, int pageSize){
        return GetAllLabOrdersOptimized(pageNo, pageSize, null);
    }

    /**
     * More efficient method that fetches patient data directly from database
     * with search functionality
     */
    public Map<String, Object> GetAllLabOrdersOptimized(int pageNo, int pageSize, String searchTerm){
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<LabOrder> ordersPage;
        
        Log.info("Searching lab orders with term: " + searchTerm + ", page: " + pageNo + ", size: " + pageSize);
        
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            // Use search query
            try {
                // Check if search term looks like a phone number (contains only digits)
                if (searchTerm.trim().matches("\\d+")) {
                    Log.info("Searching by phone number: " + searchTerm.trim());
                    ordersPage = labOrderRepository.findAllByFacilityIdAndArchivedAndPhoneNumberContaining(
                            getCurrentUserOrganization(), 0, searchTerm.trim(), pageable);
                } else {
                    Log.info("Searching by general term: " + searchTerm.trim());
                    ordersPage = labOrderRepository.findAllByFacilityIdAndArchivedAndSearchTerm(
                            getCurrentUserOrganization(), 0, searchTerm.trim(), pageable);
                }
                Log.info("Search query executed successfully. Found " + ordersPage.getTotalElements() + " results");
            } catch (Exception e) {
                Log.error("Error in search query: " + e.getMessage(), e);
                // Fallback to regular query if search fails
                ordersPage = labOrderRepository.findAllByFacilityIdAndArchived(
                        getCurrentUserOrganization(), 0, pageable);
            }
        } else {
            // Use regular query
            ordersPage = labOrderRepository.findAllByFacilityIdAndArchived(
                    getCurrentUserOrganization(), 0, pageable);
        }
        
        return processLabOrdersWithPatientData(ordersPage, pageNo, pageSize, searchTerm);
    }

    /**
     * Search lab orders by hospital number specifically
     */
    public Map<String, Object> SearchLabOrdersByHospitalNumber(int pageNo, int pageSize, String hospitalNumber){
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<LabOrder> ordersPage = labOrderRepository.findAllByFacilityIdAndArchivedAndHospitalNumberContaining(
                getCurrentUserOrganization(), 0, hospitalNumber.trim(), pageable);
        
        return processLabOrdersWithPatientData(ordersPage, pageNo, pageSize, "Hospital Number: " + hospitalNumber);
    }

    /**
     * Search lab orders by phone number specifically
     */
    public Map<String, Object> SearchLabOrdersByPhoneNumber(int pageNo, int pageSize, String phoneNumber){
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<LabOrder> ordersPage = labOrderRepository.findAllByFacilityIdAndArchivedAndPhoneNumberContaining(
                getCurrentUserOrganization(), 0, phoneNumber.trim(), pageable);
        
        return processLabOrdersWithPatientData(ordersPage, pageNo, pageSize, "Phone Number: " + phoneNumber);
    }

    /**
     * Helper method to process lab orders with patient data
     */
    private Map<String, Object> processLabOrdersWithPatientData(Page<LabOrder> ordersPage, int pageNo, int pageSize, String searchTerm){
        List<PatientLabOrderDTO> patientLabOrderDTOS = new ArrayList<>();
        
        if (ordersPage.getContent().isEmpty()) {
            Map<String, Object> result = new HashMap<>();
            result.put("data", patientLabOrderDTOS);
            result.put("totalElements", 0L);
            result.put("totalPages", 0);
            result.put("currentPage", pageNo);
            result.put("pageSize", pageSize);
            result.put("searchTerm", searchTerm);
            return result;
        }

        // Extract unique patient IDs
        Set<Long> uniquePatientIds = ordersPage.getContent().stream()
                .map(order -> (long) order.getPatientId())
                .collect(Collectors.toSet());

        // Fetch patient data directly from database
        Map<Long, Person> patientDataMap = new HashMap<>();
        try {
            List<Person> persons = personRepository.findAllById(uniquePatientIds);
            for (Person person : persons) {
                patientDataMap.put(person.getId(), person);
            }
        } catch (Exception e) {
            Log.warn("Error in batch patient data fetching: " + e.getMessage());
        }

        // Process orders using the cached patient data
        for (LabOrder order : ordersPage.getContent()) {
            try {
                Person person = patientDataMap.get((long) order.getPatientId());

                if (person != null) {
                    PatientLabOrderDTO dto = new PatientLabOrderDTO();
                    dto.setPatientAddress(
                            jsonNodeTransformer.getNodeValue(person.getAddress(), "address", "city", true));
                    dto.setPatientDob(person.getDateOfBirth());
                    dto.setPatientGender(
                            jsonNodeTransformer.getNodeValue(person.getGender(), null, "display", false));
                    dto.setPatientSex(person.getSex());
                    dto.setPatientFirstName(person.getFirstName());
                    dto.setPatientId(order.getPatientId());
                    dto.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(person.getIdentifier(),
                            "identifier", "value", true));
                    dto.setPatientLastName(person.getSurname());
                    dto.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(person.getContactPoint(),
                            "contactPoint", "value", true));
                    dto.setLabOrder(AppendAdditionalTestDetails(labMapper.toLabOrderResponseDto(order)));

                    patientLabOrderDTOS.add(dto);
                } else {
                    Log.warn("Patient not found for order ID: " + order.getId() + ", patient ID: "
                            + order.getPatientId() + " - excluding from results");
                }
            } catch (Exception e) {
                Log.warn("Error processing order ID: " + order.getId() + ", patient ID: "
                        + order.getPatientId() + " - " + e.getMessage());
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", patientLabOrderDTOS);
        result.put("totalElements", ordersPage.getTotalElements());
        result.put("totalPages", ordersPage.getTotalPages());
        result.put("currentPage", pageNo);
        result.put("pageSize", pageSize);
        result.put("searchTerm", searchTerm);
        return result;
    }

    public LabOrderListMetaDataDTO GetOrdersPendingSampleCollection(String searchParam, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders;

        if (searchParam == null || searchParam.equals("*") || searchParam.trim().isEmpty()) {
            pendingOrders = pendingOrderRepository.findAllPendingSampleCollection(paging, getCurrentUserOrganization());
        } else {
            pendingOrders = pendingOrderRepository.findAllPendingSampleCollectionWithSearch(paging,
                    getCurrentUserOrganization(), searchParam.trim());
        }

        return getLabOrderListMetaDataDto(searchParam, pendingOrders);
    }

    public LabOrderListMetaDataDTO GetOrdersPendingSampleVerification(String searchParam, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders;

        if (searchParam == null || searchParam.equals("*") || searchParam.trim().isEmpty()) {
            pendingOrders = pendingOrderRepository.findAllPendingSampleVerification(paging,
                    getCurrentUserOrganization());
        } else {
            pendingOrders = pendingOrderRepository.findAllPendingSampleVerificationWithSearch(paging,
                    getCurrentUserOrganization(), searchParam.trim());
        }

        return getLabOrderListMetaDataDto(searchParam, pendingOrders);
    }

    public LabOrderListMetaDataDTO GetOrdersPendingResults(String searchParam, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders;

        if (searchParam == null || searchParam.equals("*") || searchParam.trim().isEmpty()) {
            pendingOrders = pendingOrderRepository.findAllPendingResults(paging, getCurrentUserOrganization());
        } else {
            pendingOrders = pendingOrderRepository.findAllPendingResultsWithSearch(paging, getCurrentUserOrganization(),
                    searchParam.trim());
        }

        return getLabOrderListMetaDataDto(searchParam, pendingOrders);
    }

    // NEW PATIENT-SPECIFIC METHODS FOR OPTIMIZED PERFORMANCE
    public LabOrderListMetaDataDTO GetOrdersPendingSampleCollectionByPatient(Integer patientId, int pageNo,
            int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleCollectionByPatient(
                paging, getCurrentUserOrganization(), patientId);
        return getLabOrderListMetaDataDto("", pendingOrders);
    }

    public LabOrderListMetaDataDTO GetOrdersPendingSampleVerificationByPatient(Integer patientId, int pageNo,
            int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingSampleVerificationByPatient(
                paging, getCurrentUserOrganization(), patientId);
        return getLabOrderListMetaDataDto("", pendingOrders);
    }

    public LabOrderListMetaDataDTO GetOrdersPendingResultsByPatient(Integer patientId, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<PendingOrder> pendingOrders = pendingOrderRepository.findAllPendingResultsByPatient(
                paging, getCurrentUserOrganization(), patientId);
        return getLabOrderListMetaDataDto("", pendingOrders);
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

        List<PendingOrderDTO> validOrders = new ArrayList<>();

        for (PendingOrderDTO dto : pendingOrderList) {
            try {

                PersonResponseDto personResponseDTO = personService.getPersonById((long) dto.getPatientId());

                if (personResponseDTO != null) {
                    dto.setPatientAddress(
                            jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(), "address", "city", true));
                    dto.setPatientDob(personResponseDTO.getDateOfBirth());
                    dto.setPatientGender(
                            jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null, "display", false));
                    dto.setPatientFirstName(personResponseDTO.getFirstName());
                    dto.setPatientId(dto.getPatientId());
                    dto.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getIdentifier(),
                            "identifier", "value", true));
                    dto.setPatientLastName(personResponseDTO.getSurname());
                    dto.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getContactPoint(),
                            "contactPoint", "value", true));

                    validOrders.add(dto);
                } else {
                    Log.warn("Patient not found for ID: " + dto.getPatientId() + " - excluding from results");
                }
            } catch (Exception e) {
                // Log the error but don't break the entire API response
                Log.warn("Error fetching patient details for ID: " + dto.getPatientId() + " - " + e.getMessage());
                // Continue processing other records
            }
        }


        return validOrders.stream()
                .sorted(Comparator.comparing(PendingOrderDTO::getOrderId))
                .collect(Collectors.toList());
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
        
        if (orders == null || orders.isEmpty()) {
            return patientLabOrderDTOS;
        }

        // Extract unique patient IDs
        Set<Long> uniquePatientIds = orders.stream()
                .map(order -> (long) order.getPatientId())
                .collect(Collectors.toSet());

        // Batch fetch all patient data
        Map<Long, PersonResponseDto> patientDataMap = new HashMap<>();
        try {
            // If PersonService supports batch fetching, use it
            // For now, we'll use the existing PersonRepository to fetch from database directly
            List<Person> persons = personRepository.findAllById(uniquePatientIds);
            for (Person person : persons) {
                try {
                    PersonResponseDto personResponseDTO = personService.getPersonById(person.getId());
                    if (personResponseDTO != null) {
                        patientDataMap.put(person.getId(), personResponseDTO);
                    }
                } catch (Exception e) {
                    Log.warn("Error fetching patient details for patient ID: " + person.getId() + " - " + e.getMessage());
                }
            }
        } catch (Exception e) {
            Log.warn("Error in batch patient data fetching: " + e.getMessage());
        }

        // Process orders using the cached patient data
        for (LabOrder order : orders) {
            try {
                PersonResponseDto personResponseDTO = patientDataMap.get((long) order.getPatientId());

                if (personResponseDTO != null) {
                    PatientLabOrderDTO dto = new PatientLabOrderDTO();
                    dto.setPatientAddress(
                            jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(), "address", "city", true));
                    dto.setPatientDob(personResponseDTO.getDateOfBirth());
                    dto.setPatientGender(
                            jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null, "display", false));
                    dto.setPatientSex(personResponseDTO.getSex());
                    dto.setPatientFirstName(personResponseDTO.getFirstName());
                    dto.setPatientId(order.getPatientId());
                    dto.setPatientHospitalNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getIdentifier(),
                            "identifier", "value", true));
                    dto.setPatientLastName(personResponseDTO.getSurname());
                    dto.setPatientPhoneNumber(jsonNodeTransformer.getNodeValue(personResponseDTO.getContactPoint(),
                            "contactPoint", "value", true));
                    dto.setLabOrder(AppendAdditionalTestDetails(labMapper.toLabOrderResponseDto(order)));

                    patientLabOrderDTOS.add(dto);
                } else {
                    Log.warn("Patient not found for order ID: " + order.getId() + ", patient ID: "
                            + order.getPatientId() + " - excluding from results");
                }
            } catch (Exception e) {
                Log.warn("Error processing order ID: " + order.getId() + ", patient ID: "
                        + order.getPatientId() + " - " + e.getMessage());
            }
        }
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

                try {
                    PersonResponseDto personResponseDTO = personService
                            .getPersonById((long) updated_order.getPatientId());
                    if (personResponseDTO != null) {
                        result.setPatientAddress(jsonNodeTransformer.getNodeValue(personResponseDTO.getAddress(),
                                "address", "city", true));
                        result.setPatientDob(personResponseDTO.getDateOfBirth());
                        result.setPatientGender(jsonNodeTransformer.getNodeValue(personResponseDTO.getGender(), null,
                                "display", false));
                        result.setPatientFirstName(personResponseDTO.getFirstName());
                        result.setPatientHospitalNumber(jsonNodeTransformer
                                .getNodeValue(personResponseDTO.getIdentifier(), "identifier", "value", true));
                        result.setPatientLastName(personResponseDTO.getSurname());
                        result.setPatientPhoneNumber(jsonNodeTransformer
                                .getNodeValue(personResponseDTO.getContactPoint(), "contactPoint", "value", true));
                    } else {

                        Log.warn(
                                "Patient not found for historical result, patient ID: " + updated_order.getPatientId());
                        result.setPatientFirstName("Unknown");
                        result.setPatientLastName("Patient");
                        result.setPatientHospitalNumber("N/A");
                    }
                } catch (Exception e) {

                    Log.warn("Error fetching patient details for historical result, patient ID: "
                            + updated_order.getPatientId() + " - " + e.getMessage());
                    result.setPatientFirstName("Unknown");
                    result.setPatientLastName("Patient");
                    result.setPatientHospitalNumber("N/A");
                }

                historicalResults.add(result);
            }
        }

        return historicalResults;
    }
}
