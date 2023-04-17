package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findAllById(int id);
    List<Test> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_test WHERE date_modified > ?1 AND facility_id=?2 And archived=?3", nativeQuery = true)
    public List<Test> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, int archived);
}
