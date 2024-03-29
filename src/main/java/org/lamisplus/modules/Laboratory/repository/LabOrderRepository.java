package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LabOrderRepository extends JpaRepository<LabOrder, Integer> {
    List<LabOrder> findAllByPatientIdAndFacilityIdAndArchived(Integer patientId, Long facilityId, int archived);
    List<LabOrder> findAllByVisitIdAndFacilityIdAndArchived(Integer visitId, Long facilityId, int archived);
    List<LabOrder> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_order WHERE date_modified > ?1 AND facility_id=?2", nativeQuery = true)
    public List<LabOrder> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);
    @Query(value ="SELECT * FROM laboratory_order WHERE date_modified > ?1 AND facility_id=?2 AND archived=?3", nativeQuery = true)
    public List<LabOrder> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, Integer archived);
    Optional<LabOrder> findByUuidAndFacilityId(String uuid, Long facilityId);
    Optional<LabOrder> findByUuid(String uuid);
    List<LabOrder> findAllByFacilityId(Long facilityId);
    Optional<LabOrder> findByIdAndArchived(int id, int archived);
}
