package org.lamisplus.modules.laboratory.repository;

import org.lamisplus.modules.laboratory.domain.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findAllByIdAndArchived(int id, int archived);
    List<Test> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_test WHERE date_modified > ?1 AND facility_id=?2", nativeQuery = true)
    public List<Test> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);
    @Query(value ="SELECT * FROM laboratory_test WHERE date_modified > ?1 AND facility_id=?2 AND archived=?3", nativeQuery = true)
    public List<Test> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, Integer archived);
    Optional<Test> findByUuidAndFacilityId(String uuid, Long facilityId);
    Optional<Test> findByUuid(String uuid);
    List<Test> findAllByFacilityId(Long facilityId);
    Optional<Test> findByIdAndArchived(int id, int archived);
}
