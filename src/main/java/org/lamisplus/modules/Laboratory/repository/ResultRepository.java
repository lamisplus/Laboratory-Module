package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.LabOrder;
import org.lamisplus.modules.laboratory.domain.entity.Result;
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
}
