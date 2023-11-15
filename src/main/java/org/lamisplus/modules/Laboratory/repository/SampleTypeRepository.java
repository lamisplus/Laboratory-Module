package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.SampleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleTypeRepository extends JpaRepository<SampleType, Integer> {
}
