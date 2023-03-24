package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SampleRepository  extends JpaRepository<Sample, Integer> {
    List<Sample> findAllByTestId(int TestId);
}
