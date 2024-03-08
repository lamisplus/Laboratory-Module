package org.lamisplus.modules.laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.laboratory.domain.dto.LabTestGroupDTO;
import org.lamisplus.modules.laboratory.domain.entity.LabTest;
import org.lamisplus.modules.laboratory.service.LabTestGroupService;
import org.lamisplus.modules.laboratory.service.LabTestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryLabTestsController {
    private final LabTestGroupService labTestGroupService;
    private final LabTestService labTestService;

    @GetMapping("/labtestgroups")
    public List<LabTestGroupDTO> GetAllLabTestGroups(){
        return labTestGroupService.GetAllLabTestGroups();
    }


    @GetMapping("/labtestgroups/tb")
    public List<LabTestGroupDTO> GetAllTbLabTestGroups(){
        return labTestGroupService.GetAllTbLabTestGroups();
    }

    @GetMapping("/labtests/{testName}")
    public LabTest GetLabTestDetailsByName(@PathVariable String testName){
        return labTestService.FindLabTestByName(testName);
    }

}
