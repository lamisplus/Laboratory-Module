package org.lamisplus.modules.laboratory.repository;


import org.lamisplus.modules.laboratory.domain.entity.CodeSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodesetRepository extends JpaRepository<CodeSet, Integer> {
}
