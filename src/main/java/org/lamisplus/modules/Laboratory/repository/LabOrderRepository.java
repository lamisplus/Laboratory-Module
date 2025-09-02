package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.LabOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LabOrderRepository extends JpaRepository<LabOrder, Integer> {
    List<LabOrder> findAllByPatientIdAndFacilityIdAndArchived(Integer patientId, Long facilityId, int archived);
    List<LabOrder> findAllByVisitIdAndFacilityIdAndArchived(Integer visitId, Long facilityId, int archived);
    List<LabOrder> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    Page<LabOrder> findAllByFacilityIdAndArchived(Long facilityId, Integer archived, Pageable pageable);
    Long countByFacilityIdAndArchived(Long facilityId, Integer archived);
    
    // Search methods
    @Query(value = "SELECT lo.* FROM laboratory_order lo " +
            "INNER JOIN patient_person pp ON lo.patient_id = pp.id " +
            "WHERE lo.facility_id = ?1 AND lo.archived = ?2 " +
            "AND pp.hospital_number ILIKE %?3% " +
            "ORDER BY lo.id DESC", nativeQuery = true)
    Page<LabOrder> findAllByFacilityIdAndArchivedAndHospitalNumberContaining(
            Long facilityId, Integer archived, String searchTerm, Pageable pageable);
    
    @Query(value = "SELECT lo.* FROM laboratory_order lo " +
            "INNER JOIN patient_person pp ON lo.patient_id = pp.id " +
            "WHERE lo.facility_id = ?1 AND lo.archived = ?2 " +
            "AND pp.contact_point::text ILIKE %?3% " +
            "ORDER BY lo.id DESC", nativeQuery = true)
    Page<LabOrder> findAllByFacilityIdAndArchivedAndPhoneNumberContaining(
            Long facilityId, Integer archived, String searchTerm, Pageable pageable);
    
    @Query(value = "SELECT lo.* FROM laboratory_order lo " +
            "INNER JOIN patient_person pp ON lo.patient_id = pp.id " +
            "WHERE lo.facility_id = ?1 AND lo.archived = ?2 " +
            "AND (pp.hospital_number ILIKE %?3% " +
            "OR pp.first_name ILIKE %?3% " +
            "OR pp.surname ILIKE %?3% " +
            "OR pp.full_name ILIKE %?3%) " +
            "ORDER BY lo.id DESC", nativeQuery = true)
    Page<LabOrder> findAllByFacilityIdAndArchivedAndSearchTerm(
            Long facilityId, Integer archived, String searchTerm, Pageable pageable);
    @Query(value ="SELECT * FROM laboratory_order WHERE date_modified > ?1 AND facility_id=?2", nativeQuery = true)
    public List<LabOrder> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);
    @Query(value ="SELECT * FROM laboratory_order WHERE date_modified > ?1 AND facility_id=?2 AND archived=?3", nativeQuery = true)
    public List<LabOrder> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, Integer archived);
    Optional<LabOrder> findByUuidAndFacilityId(String uuid, Long facilityId);
    Optional<LabOrder> findByUuid(String uuid);
    List<LabOrder> findAllByFacilityId(Long facilityId);
    Optional<LabOrder> findByIdAndArchived(int id, int archived);
}
