package org.lamisplus.modules.Laboratory.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "laboratory_labtestgroup")
public class LabTestGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "group_name")
    private String GroupName;

    @JoinColumn(name = "labtestgroup_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LabTest> labTests;
}
