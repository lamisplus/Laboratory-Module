package org.lamisplus.modules.Laboratory.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "laboratory_labtest")
public class LabTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "lab_test_name")
    private String labTestName;
    @Column(name = "unit")
    private String unit;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "labtestgroup_id")
    private Integer labTestGroupId;

    @ManyToMany
    @JoinTable(
            name = "laboratory_sampletype_labtest_link",
            joinColumns = @JoinColumn(name = "labtest_id"),
            inverseJoinColumns = @JoinColumn(name = "sample_type_id"))
    private List<SampleType> sampleType;
}
