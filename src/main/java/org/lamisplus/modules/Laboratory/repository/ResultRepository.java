package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ResultRepository  extends JpaRepository<Result, Integer> {
    List<Result> findAllByTestId(int TestId);
    List<Result> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_result WHERE date_modified > ?1 AND facility_id=?2 And archived=?3", nativeQuery = true)
    public List<Result> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, int archived);
}
