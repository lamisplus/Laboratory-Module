package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SampleRepository  extends JpaRepository<Sample, Integer> {
    List<Sample> findAllByTestIdAndArchived(int TestId, int archived);
    List<Sample> findAllByFacilityIdAndArchived(Long facilityId, Integer archived);
    @Query(value ="SELECT * FROM laboratory_sample WHERE date_modified > ?1 AND facility_id=?2", nativeQuery = true)
    public List<Sample> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);
    @Query(value ="SELECT * FROM laboratory_sample WHERE date_modified > ?1 AND facility_id=?2 AND archived=?3", nativeQuery = true)
    public List<Sample> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId, Integer archived);
    Optional<Sample> findByUuidAndFacilityId(String uuid, Long facilityId);
    Optional<Sample> findByUuid(String uuid);
    List<Sample> findAllByFacilityId(Long facilityId);
    Optional<Sample> findByIdAndArchived(int id, int archived);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM laboratory_sample WHERE sample_number = :sampleNumber AND archived = 0)", nativeQuery = true)
    boolean existsBySampleNumberAndArchived(@Param("sampleNumber") String sampleNumber);
}
