package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.CodeSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodesetRepository extends JpaRepository<CodeSet, Integer> {
}
