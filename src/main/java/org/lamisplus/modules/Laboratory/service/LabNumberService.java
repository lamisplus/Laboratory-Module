package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.Laboratory.domain.entity.LabNumber;
import org.lamisplus.modules.Laboratory.repository.LabNumberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class LabNumberService {
    private final LabNumberRepository repository;

    public LabNumber Save(LabNumber labNumber){
        labNumber.setUuid(UUID.randomUUID().toString());
        return repository.save(labNumber);
    }

    public LabNumber Update(int id, LabNumber labNumber){
        return repository.save(labNumber);
    }

    public String Delete(int id) throws Exception {
        LabNumber labNumber = repository.findById(id).orElse(null);
        if(labNumber !=null) {
            labNumber.setArchived(1);
            return id+ " deleted successfully";
        }
        else {
            throw new Exception("ID not found");
        }
    }

    public List<LabNumber> FindAllLabNumbers(){
        return  repository.findAll();
    }
}
