package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.HistoricalResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HistoricalResultRepository extends JpaRepository<HistoricalResult, Integer> {
    @Query(value = "select b.id, a.id as order_id, a.patient_id, e.lab_test_name, f.group_name, a.order_date\n" +
            ", c.date_sample_collected\n" +
            ", c.date_sample_verified\n" +
            ", d.date_result_reported, d.result_reported\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "inner join laboratory_sample c on b.id=c.test_id\n" +
            "inner join laboratory_result d on b.id=d.test_id\n" +
            "inner join laboratory_labtest e on b.lab_test_id=e.id\n" +
            "inner join laboratory_labtestgroup f on b.lab_test_group_id=f.id\n" +
            "where a.patient_id=?1 and a.facility_id=?2\n" +
            "order by b.id desc", nativeQuery = true)
    List<HistoricalResult> findHistoricalResultByPatientId(int patientId, Long facilityId);
}
