package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.dto.LastTestResult;
import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ResultRepository  extends JpaRepository<Result, Integer> {
    List<Result> findAllByTestIdAndArchived(int TestId, int archived);
    List<Result> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_result WHERE date_modified > ?1 AND facility_id=?2", nativeQuery = true)
    public List<Result> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);
    @Query(value ="SELECT * FROM laboratory_result WHERE date_modified > ?1 AND facility_id=?2 AND archived=?3", nativeQuery = true)
    public List<Result> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, Integer archived);
    Optional<Result> findByUuidAndFacilityId(String uuid, Long facilityId);
    Optional<Result> findByUuid(String uuid);
    List<Result> findAllByFacilityId(Long facilityId);
    Optional<Result> findByIdAndArchived(int id, int archived);

    @Query(value =
            "SELECT l.* FROM laboratory_test t join laboratory_result l on l.test_id = t.id " +
                    "WHERE t.patient_id = ?1 AND t.facility_id=?2 AND t.lab_test_id = ?3 and t.archived = 0 order by l.date_result_reported desc limit 1 ", nativeQuery = true)
    Optional<Result> getLastTestResult(Long patientId, Long facilityId, Integer testId);
}
