package org.lamisplus.modules.laboratory.repository;
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
    @Query(value =
            "SELECT l.* FROM laboratory_test t join laboratory_result l on l.test_id = t.id " +
                    "WHERE t.patient_id = ?1 AND t.facility_id=?2 AND t.lab_test_id = ?3 and t.archived = 0 order by l.date_result_reported desc limit 1 ", nativeQuery = true)
    Optional<Result> getLastTestResult(Long patientId, Long facilityId, Integer testId);

    @Query(value = "SELECT currentViralLoad, dateOfCurrentViralLoad FROM (\n" +
            "SELECT personUuid, vlFacility, vlArchived, currentViralLoad, dateOfCurrentViralLoad FROM (\n" +
            "         SELECT CAST(ls.date_sample_collected AS DATE ) AS dateOfCurrentViralLoadSample, sm.patient_uuid as personUuid , sm.facility_id as vlFacility, sm.archived as vlArchived, acode.display as viralLoadIndication, sm.result_reported as currentViralLoad,CAST(sm.date_result_reported AS DATE) as dateOfCurrentViralLoad\n" +
            "         FROM public.laboratory_result  sm\n" +
            "      INNER JOIN public.laboratory_test  lt on sm.test_id = lt.id\n" +
            "  INNER JOIN public.laboratory_sample ls on ls.test_id = lt.id\n" +
            "      INNER JOIN public.base_application_codeset  acode on acode.id =  lt.viral_load_indication\n" +
            "         WHERE lt.lab_test_id = 16\n" +
            "           AND  lt.viral_load_indication !=719\n" +
            "           AND sm. date_result_reported IS NOT NULL\n" +
            "           AND sm.result_reported is NOT NULL\n" +
            "     )as vl_result\n" +
            "   WHERE (vl_result.vlArchived = 0 OR vl_result.vlArchived is null)\n" +
            "   \tAND personUuid = ?1 AND dateOfCurrentViralLoad = ?2\n" +
            "     AND  vl_result.vlFacility = ?3 ORDER BY dateOfCurrentViralLoadSample DESC LIMIT 1\n" +
            "\t ) lab", nativeQuery = true)
    Optional <Result> findByPatientUuidAndDateResultReceived(String patientUuid, LocalDateTime dateResultReceived);
}
