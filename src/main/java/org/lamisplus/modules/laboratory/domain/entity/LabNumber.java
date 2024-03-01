package org.lamisplus.modules.laboratory.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "laboratory_number")
public class LabNumber extends Audit<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "lab_name")
    private String labName;
    @Column(name = "lab_number")
    private String labNumber;
    @Column(name = "archived")
    private Integer archived;
    @PrePersist
    public void setFields(){
        if(archived == null){
            archived = 0;
        }
    }
}
