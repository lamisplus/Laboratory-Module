package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.Laboratory.domain.dto.TestDTO;
import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.LabOrderRepository;
import org.lamisplus.modules.Laboratory.repository.TestRepository;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository repository;
    private final LabOrderRepository labOrderRepository;
    private final LabMapper labMapper;
    private  final UserService userService;

    public TestDTO Save(TestDTO testDTO){
        Test test = labMapper.toTest(testDTO);
        test.setUuid(UUID.randomUUID().toString());

        LabOrder labOrder = labOrderRepository.findByIdAndArchived(test.getLabOrderId(), 0).orElse(null);
        test.setFacilityId(getCurrentUserOrganization());
        assert labOrder != null;
        test.setPatientId(labOrder.getPatientId());

        return labMapper.toTestDto(repository.save(test));
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public TestDTO Update(int order_id, TestDTO testDTO){
        // Fetch the existing entity from database to preserve all fields
        Test existingTest = repository.findByIdAndArchived(testDTO.getId(), 0)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + testDTO.getId()));

        // Update only the fields that are provided in the DTO
        if(testDTO.getLabTestId() != null) {
            existingTest.setLabTestId(testDTO.getLabTestId());
        }
        if(testDTO.getLabTestGroupId() != null) {
            existingTest.setLabTestGroupId(testDTO.getLabTestGroupId());
        }
        if(testDTO.getDescription() != null) {
            existingTest.setDescription(testDTO.getDescription());
        }
        if(testDTO.getClinicalNote() != null) {
            existingTest.setClinicalNote(testDTO.getClinicalNote());
        }
        if(testDTO.getLabNumber() != null) {
            existingTest.setLabNumber(testDTO.getLabNumber());
        }
        if(testDTO.getOrderPriority() != null) {
            existingTest.setOrderPriority(testDTO.getOrderPriority());
        }
        if(testDTO.getLabTestOrderStatus() != null) {
            existingTest.setLabTestOrderStatus(testDTO.getLabTestOrderStatus());
        }
        if(testDTO.getViralLoadIndication() != null) {
            existingTest.setViralLoadIndication(testDTO.getViralLoadIndication());
        }
        if(testDTO.getLabOrderId() != null) {
            existingTest.setLabOrderId(testDTO.getLabOrderId());
        }
        if(testDTO.getPatientUuid() != null) {
            existingTest.setPatientUuid(testDTO.getPatientUuid());
        }

        // Ensure archived remains 0
        existingTest.setArchived(0);

        return labMapper.toTestDto(repository.save(existingTest));
    }

    public String Delete(Integer id){
        Test labOrder = repository.findByIdAndArchived(id, 0).orElse(null);
        assert labOrder != null;
        //repository.delete(labOrder);
        labOrder.setArchived(1);
        repository.save(labOrder);
        return id + " deleted successfully";
    }

    public TestDTO FindById(Integer id){
        return labMapper.toTestDto(repository.findAllByIdAndArchived(id, 0).get(0));
    }
}
