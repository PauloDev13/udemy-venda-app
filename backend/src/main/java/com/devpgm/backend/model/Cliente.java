package com.devpgm.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "cliente")
public class Cliente {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, length = 30)
  private String email;

  @Column(nullable = false, length = 15)
  private String cpf;

  @Column(nullable = false)
  private String address;

  @Column(length = 15)
  private String phone;

  @Column(nullable = false)
  @JsonFormat(pattern = "dd/MM/yyyy")
  private LocalDate dateBirth;

  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private LocalDateTime dateRegister;

  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private LocalDateTime updatedAt;

  @PrePersist
  private void prePersist() {
    setDateRegister(LocalDateTime.now());
    
    if (getUpdatedAt() == null) {
      setUpdatedAt(LocalDateTime.now());
    }
  }

  @PreUpdate
  private void preUpdate() {
    setUpdatedAt(LocalDateTime.now());
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Cliente cliente = (Cliente) o;
    return Objects.equals(id, cliente.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
