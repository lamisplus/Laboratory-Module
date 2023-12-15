package org.lamisplus.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.laboratory.domain.dto.LabTestGroupDTO;
import org.lamisplus.modules.laboratory.domain.entity.LabTestGroup;
import org.lamisplus.modules.laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.laboratory.repository.LabTestGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LabTestGroupService {
    private final LabTestGroupRepository labTestGroupRepository;
    private final LabMapper labMapper;

    public List<LabTestGroupDTO> GetAllLabTestGroups(){
        return labMapper.toLabTestGroupDtoList(labTestGroupRepository.findAll());
    }

    public  LabTestGroupDTO SaveLabTestGroup(LabTestGroupDTO labTestGroupDTO){
        LabTestGroup labTestGroup = labMapper.toLabTestGroup(labTestGroupDTO);
        return labMapper.toLabTestGroupDto(labTestGroupRepository.save(labTestGroup));
    }

    public  String FindLabTestGroupNameById(Integer id){
        return Objects.requireNonNull(labTestGroupRepository.findById(id).orElse(null)).getGroupName();
    }
}
