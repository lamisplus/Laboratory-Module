package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface SampleRepository  extends JpaRepository<Sample, Integer> {
    List<Sample> findAllByTestId(int TestId);
    List<Sample> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_sample WHERE date_modified > ?1 AND facility_id=?2 And archived=?3", nativeQuery = true)
    public List<Sample> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, int archived);
}
