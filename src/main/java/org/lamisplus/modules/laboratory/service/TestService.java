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
        Test test = labMapper.toTest(testDTO);
        test.setArchived(0);
        return labMapper.toTestDto(repository.save(test));
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
