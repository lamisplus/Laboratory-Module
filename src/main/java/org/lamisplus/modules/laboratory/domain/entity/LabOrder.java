package org.lamisplus.modules.laboratory.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "laboratory_order")
public class LabOrder extends Audit<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "visit_id")
    private Integer visitId;
    @Column(name = "patient_id")
    private Integer patientId;
    @Column(name = "userid")
    private String userId;
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    @Column(name = "patient_uuid")
    private String patientUuid;
    @Column(name = "facility_id")
    private Long facilityId;
    @Column(name = "archived")
    private Integer archived;
    @JoinColumn(name = "lab_order_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Test> tests;
    //add new columns
    @Column(name = "ordered_date")
    private LocalDate orderedDate;
    @Column(name = "lab_order_indication")
    private String labOrderIndication;
    @PrePersist
    public void setFields(){
        if(archived == null){
            archived = 0;
        }
    }

}
