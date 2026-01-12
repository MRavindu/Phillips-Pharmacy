package com.phillipspharmacy.medicare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @ManyToOne // Many staff can have one role
    @JoinColumn(name = "role_id") // This links to the foreign key in MySQL
    private Role role;

    @Column(name = "is_deleted")
    private Integer isDeleted = 0;
}