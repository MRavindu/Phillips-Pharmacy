package com.phillipspharmacy.medicare.model;

import java.time.LocalDateTime;

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

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "token_expiry")
    private LocalDateTime tokenExpiry;

    // --- ADD THESE METHODS AT THE BOTTOM ---

    // Getter and Setter for resetToken
    // public String getResetToken() {
    //     return resetToken;
    // }

    // public void setResetToken(String resetToken) {
    //     this.resetToken = resetToken;
    // }

    // // Getter and Setter for tokenExpiry
    // public LocalDateTime getTokenExpiry() {
    //     return tokenExpiry;
    // }

    // public void setTokenExpiry(LocalDateTime tokenExpiry) {
    //     this.tokenExpiry = tokenExpiry;
    // }

}