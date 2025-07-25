package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.LabTestGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LabTestGroupRepository extends JpaRepository<LabTestGroup, Integer> {

    @Query(value = "SELECT * FROM laboratory_labtestgroup", nativeQuery = true)
    Optional<LabTestGroup> getTbLabTestGroup();

}
