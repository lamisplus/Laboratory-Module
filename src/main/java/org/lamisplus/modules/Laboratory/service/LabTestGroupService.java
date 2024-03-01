package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.Laboratory.domain.dto.LabTestGroupDTO;
import org.lamisplus.modules.Laboratory.domain.entity.LabTestGroup;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.LabTestGroupRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LabTestGroupService {
    private final LabTestGroupRepository labTestGroupRepository;
    private final LabMapper labMapper;

    public List<LabTestGroupDTO> GetAllLabTestGroups(){
        List<LabTestGroup> all = labTestGroupRepository.findAll();
        return labMapper.toLabTestGroupDtoList(all);
    }

    public  LabTestGroupDTO SaveLabTestGroup(LabTestGroupDTO labTestGroupDTO){
        LabTestGroup labTestGroup = labMapper.toLabTestGroup(labTestGroupDTO);
        return labMapper.toLabTestGroupDto(labTestGroupRepository.save(labTestGroup));
    }

    public  String FindLabTestGroupNameById(Integer id){
        return Objects.requireNonNull(labTestGroupRepository.findById(id).orElse(null)).getGroupName();
    }

    public List<LabTestGroupDTO> GetAllTbLabTestGroups() {
        Optional<LabTestGroup> tbLabTestGroup = labTestGroupRepository.getTbLabTestGroup();
        // Use orElse or orElseGet to provide a default value if the Optional is empty
        List<LabTestGroup> labTestGroups = tbLabTestGroup.map(Collections::singletonList).orElse(Collections.emptyList());
        return labMapper.toLabTestGroupDtoList(labTestGroups);

    }
}
