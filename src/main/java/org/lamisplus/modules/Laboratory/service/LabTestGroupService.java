package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.dto.LabTestGroupDTO;
import org.lamisplus.modules.Laboratory.domain.entity.LabTestGroup;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.LabTestGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
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
