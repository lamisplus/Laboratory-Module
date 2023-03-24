package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository  extends JpaRepository<Result, Integer> {
    List<Result> findAllByTestId(int TestId);
}
