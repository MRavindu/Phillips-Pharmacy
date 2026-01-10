package com.phillipspharmacy.medicare.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "staff")
@Data
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffid;

    private String snic;
    private String sname;
    private String semail;
    private String stelno;
    private String uname;
    private String upswrd;
    private String urole;

    @Column(name = "is_deleted")
    private Integer isDeleted = 0;
}