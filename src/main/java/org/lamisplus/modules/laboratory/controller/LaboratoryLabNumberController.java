package org.lamisplus.modules.laboratory.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.laboratory.domain.entity.LabNumber;
import org.lamisplus.modules.laboratory.service.LabNumberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/laboratory")
public class LaboratoryLabNumberController {
    private final LabNumberService service;

    @PostMapping("/lab-numbers")
    public LabNumber Save(@RequestBody LabNumber labNumber){
        return service.Save(labNumber);
    }

    @PutMapping("/lab-numbers/{id}")
    public LabNumber Update(@PathVariable int id, @RequestBody LabNumber labNumber){
        return service.Update(id, labNumber);
    }

    @DeleteMapping("/lab-numbers/{id}")
    public String Delete(@PathVariable int id) throws Exception {
        return service.Delete(id);
    }

    @GetMapping("/lab-numbers")
    public List<LabNumber> GetAllLabNumbers(){
        return service.FindAllLabNumbers();
    }
}
