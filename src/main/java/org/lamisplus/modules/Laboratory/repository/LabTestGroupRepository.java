package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.LabTestGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LabTestGroupRepository extends JpaRepository<LabTestGroup, Integer> {

    @Query(value = "SELECT * FROM laboratory_labtestgroup where id  = 5", nativeQuery = true)
    Optional<LabTestGroup> getTbLabTestGroup();

}
