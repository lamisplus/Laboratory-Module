package org.lamisplus.modules.Laboratory.repository;

import org.lamisplus.modules.Laboratory.domain.entity.PendingOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PendingOrderRepository extends JpaRepository<PendingOrder, Integer> {

        @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders \n" +
                        "            , sum(case when c.id is not null then 1 else 0 end) as collected_samples \n" +
                        "            , sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples \n"
                        +
                        "            , sum(case when d.id is not null then 1 else 0 end) as reported_results \n" +
                        "            from laboratory_order a \n" +
                        "            inner join laboratory_test b on a.id=b.lab_order_id \n" +
                        "            left join laboratory_sample c on b.id=c.test_id \n" +
                        "            left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId and  a.archived = 0 \n"
                        +
                        "            group by a.patient_id, a.id \n" +
                        "            having sum(case when c.id is not null then 1 else 0 end) < sum(1)  ", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleCollection(Pageable pageable, @Param("facilityId") Long facilityId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
            ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
            ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
            ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId and  a.archived = 0 \n"
                    +
            "group by a.patient_id, a.id\n" +
            "having sum(case when c.date_sample_verified is not null then 1 else 0 end)<\n" +
            "sum(case when c.id is not null then 1 else 0 end) ", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleVerification(Pageable pageable, @Param("facilityId") Long facilityId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
            ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
            ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
            ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId and  a.archived = 0 \n"
                    +
            "group by a.patient_id, a.id\n" +
            "having sum(case when c.id is not null then 1 else 0 end) >= 1", nativeQuery = true)
    Page<PendingOrder> findAllPendingResults(Pageable pageable, @Param("facilityId") Long facilityId);


    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
            ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
            ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
            ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId and  a.archived = 0\n"
                    +
            "group by a.patient_id, a.id\n" +
            "having sum(case when c.id is not null then 1 else 0 end) < sum(1) ", nativeQuery = true)
    List<PendingOrder> findAllPendingSampleCollection(@Param("facilityId") Long facilityId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
            ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
            ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
            ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "left join laboratory_sample c on b.id=c.test_id\n" +
            "left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId\n" +
            "group by a.patient_id, a.id\n" +
            "having sum(case when c.date_sample_verified is not null then 1 else 0 end)<\n" +
            "sum(case when c.id is not null then 1 else 0 end) ", nativeQuery = true)
    List<PendingOrder> findAllPendingSampleVerification(@Param("facilityId") Long facilityId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
            ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
            ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
            ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
            "from laboratory_order a\n" +
            "inner join laboratory_test b on a.id=b.lab_order_id\n" +
            "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id where a.facility_id=:facilityId and  a.archived = 0\n"
                    +
            "group by a.patient_id, a.id\n" +
            "having sum(case when c.id is not null then 1 else 0 end) >= 1", nativeQuery = true)
    List<PendingOrder> findAllPendingResults(@Param("facilityId") Long facilityId);

    @Query(value = "select sub.id as id, sub.patient_id, sub.order_id, sub.order_date, sub.test_orders,\n" +
                    "       sub.collected_samples, sub.verified_samples, sub.reported_results\n" +
                    "from (\n" +
                    "    select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders,\n" +
                    "           sum(case when c.id is not null then 1 else 0 end) as collected_samples,\n" +
                    "           sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples,\n"
                    +
                    "           sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
                    "    from laboratory_order a\n" +
                    "    inner join laboratory_test b on a.id=b.lab_order_id\n" +
                    "    inner join patient p on a.patient_id = p.id\n" +
                    "    left join laboratory_sample c on b.id=c.test_id\n" +
                    "    left join laboratory_result d on b.id=d.test_id\n" +
                    "    where a.facility_id=:facilityId and a.archived = 0\n" +
                    "    and (LOWER(CONCAT(COALESCE(p.first_name, ''), ' ', COALESCE(p.surname, ''))) LIKE LOWER(CONCAT('%', :searchParam, '%'))\n"
                    +
                    "         OR LOWER(COALESCE(p.hospital_number, '')) LIKE LOWER(CONCAT('%', :searchParam, '%')))\n" +
                    "    group by a.patient_id, a.id\n" +
                    ") sub\n" +
                    "where sub.collected_samples < sub.test_orders", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleCollectionWithSearch(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("searchParam") String searchParam);

    @Query(value = "select sub.id as id, sub.patient_id, sub.order_id, sub.order_date, sub.test_orders,\n" +
                    "       sub.collected_samples, sub.verified_samples, sub.reported_results\n" +
                    "from (\n" +
                    "    select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders,\n" +
                    "           sum(case when c.id is not null then 1 else 0 end) as collected_samples,\n" +
                    "           sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples,\n"
                    +
                    "           sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
                    "    from laboratory_order a\n" +
                    "    inner join laboratory_test b on a.id=b.lab_order_id\n" +
                    "    inner join patient p on a.patient_id = p.id\n" +
                    "    left join laboratory_sample c on b.id=c.test_id\n" +
                    "    left join laboratory_result d on b.id=d.test_id\n" +
                    "    where a.facility_id=:facilityId and a.archived = 0\n" +
                    "    and (LOWER(CONCAT(COALESCE(p.first_name, ''), ' ', COALESCE(p.surname, ''))) LIKE LOWER(CONCAT('%', :searchParam, '%'))\n"
                    +
                    "         OR LOWER(COALESCE(p.hospital_number, '')) LIKE LOWER(CONCAT('%', :searchParam, '%')))\n" +
                    "    group by a.patient_id, a.id\n" +
                    ") sub\n" +
                    "where sub.verified_samples < sub.collected_samples", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleVerificationWithSearch(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("searchParam") String searchParam);

    @Query(value = "select sub.id as id, sub.patient_id, sub.order_id, sub.order_date, sub.test_orders,\n" +
                    "       sub.collected_samples, sub.verified_samples, sub.reported_results\n" +
                    "from (\n" +
                    "    select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders,\n" +
                    "           sum(case when c.id is not null then 1 else 0 end) as collected_samples,\n" +
                    "           sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples,\n"
                    +
                    "           sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
                    "    from laboratory_order a\n" +
                    "    inner join laboratory_test b on a.id=b.lab_order_id\n" +
                    "    inner join patient p on a.patient_id = p.id\n" +
                    "    left join laboratory_sample c on b.id=c.test_id\n" +
                    "    left join laboratory_result d on b.id=d.test_id\n" +
                    "    where a.facility_id=:facilityId and a.archived = 0\n" +
                    "    and (LOWER(CONCAT(COALESCE(p.first_name, ''), ' ', COALESCE(p.surname, ''))) LIKE LOWER(CONCAT '%', :searchParam, '%'))\n"
                    +
                    "         OR LOWER(COALESCE(p.hospital_number, '')) LIKE LOWER(CONCAT('%', :searchParam, '%')))\n" +
                    "    group by a.patient_id, a.id\n" +
                    ") sub\n" +
                    "where sub.collected_samples >= 1", nativeQuery = true)
    Page<PendingOrder> findAllPendingResultsWithSearch(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("searchParam") String searchParam);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders \n" +
                    "            , sum(case when c.id is not null then 1 else 0 end) as collected_samples \n" +
                    "            , sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples \n"
                    +
                    "            , sum(case when d.id is not null then 1 else 0 end) as reported_results \n" +
                    "            from laboratory_order a \n" +
                    "            inner join laboratory_test b on a.id=b.lab_order_id \n" +
                    "            left join laboratory_sample c on b.id=c.test_id \n" +
                    "            left join laboratory_result d on b.id=d.test_id \n" +
                    "            where a.facility_id=:facilityId and a.archived = 0 and a.patient_id = :patientId \n" +
                    "            group by a.patient_id, a.id \n" +
                    "            having sum(case when c.id is not null then 1 else 0 end) < sum(1)", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleCollectionByPatient(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("patientId") Integer patientId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
                    ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
                    ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
                    ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
                    "from laboratory_order a\n" +
                    "inner join laboratory_test b on a.id=b.lab_order_id\n" +
                    "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id \n" +
                    "where a.facility_id=:facilityId and a.archived = 0 and a.patient_id = :patientId \n" +
                    "group by a.patient_id, a.id\n" +
                    "having sum(case when c.date_sample_verified is not null then 1 else 0 end)<\n" +
                    "sum(case when c.id is not null then 1 else 0 end)", nativeQuery = true)
    Page<PendingOrder> findAllPendingSampleVerificationByPatient(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("patientId") Integer patientId);

    @Query(value = "select a.id as id, a.patient_id, a.id as order_id, a.order_date, sum(1) as test_orders\n" +
                    ", sum(case when c.id is not null then 1 else 0 end) as collected_samples\n" +
                    ", sum(case when c.date_sample_verified is not null then 1 else 0 end) as verified_samples\n" +
                    ", sum(case when d.id is not null then 1 else 0 end) as reported_results\n" +
                    "from laboratory_order a\n" +
                    "inner join laboratory_test b on a.id=b.lab_order_id\n" +
                    "left join laboratory_sample c on b.id=c.test_id\n" +
                    "left join laboratory_result d on b.id=d.test_id \n" +
                    "where a.facility_id=:facilityId and a.archived = 0 and a.patient_id = :patientId \n" +
                    "group by a.patient_id, a.id\n" +
                    "having sum(case when c.id is not null then 1 else 0 end) >= 1", nativeQuery = true)
    Page<PendingOrder> findAllPendingResultsByPatient(Pageable pageable,
                    @Param("facilityId") Long facilityId,
                    @Param("patientId") Integer patientId);
}