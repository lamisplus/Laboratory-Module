package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.PCRLab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PCRLabRepository extends JpaRepository<PCRLab, Long>
{
    @Query(value = "SELECT * FROM lims_pcr_lab order by name", nativeQuery = true)
    List<PCRLab> allpcrlabs();

}

