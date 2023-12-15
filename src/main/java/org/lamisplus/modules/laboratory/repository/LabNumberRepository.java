package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.LabNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabNumberRepository extends JpaRepository<LabNumber, Integer> {

}
