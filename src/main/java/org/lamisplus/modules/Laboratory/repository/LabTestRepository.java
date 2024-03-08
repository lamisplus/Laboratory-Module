package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabTestRepository  extends JpaRepository<LabTest, Integer> {
    LabTest findByLabTestNameContainsIgnoreCase(String TestName);

}
