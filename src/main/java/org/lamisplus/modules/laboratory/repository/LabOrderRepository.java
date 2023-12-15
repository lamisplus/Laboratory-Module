package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.LabOrder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
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

    @Modifying
    @Transactional
    @Query(value = "UPDATE hiv_observation " +
            "SET data = jsonb_set(data, '{tbIptScreening, eligibleForTPT}', '\"Yes\"', true) " +
            "WHERE person_uuid = :personUuid AND date_of_observation = :dateOfObservation", nativeQuery = true)
    void updateEligibleForTPT(@Param("personUuid") String personUuid, @Param("dateOfObservation") LocalDate dateOfObservation);
}
