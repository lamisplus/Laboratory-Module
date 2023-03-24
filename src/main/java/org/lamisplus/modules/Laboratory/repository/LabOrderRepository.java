package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LabOrderRepository extends JpaRepository<LabOrder, Integer> {
    List<LabOrder> findAllByPatientIdAndFacilityId(Integer patientId, Long facilityId);
    List<LabOrder> findAllByVisitIdAndFacilityId(Integer visitId, Long facilityId);
}
