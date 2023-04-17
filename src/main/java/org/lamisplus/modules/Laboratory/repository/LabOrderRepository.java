package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface LabOrderRepository extends JpaRepository<LabOrder, Integer> {
    List<LabOrder> findAllByPatientIdAndFacilityId(Integer patientId, Long facilityId);
    List<LabOrder> findAllByVisitIdAndFacilityId(Integer visitId, Long facilityId);
    List<LabOrder> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_order WHERE date_modified > ?1 AND facility_id=?2 And archived=?3", nativeQuery = true)
    public List<LabOrder> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, int archived);
}
