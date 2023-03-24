package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.SampleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleTypeRepository extends JpaRepository<SampleType, Integer> {
}
