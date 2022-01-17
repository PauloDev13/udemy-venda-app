package com.devpgm.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
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

  @Column(length = 30)
  private String email;

  @Column(nullable = false, length = 15)
  private String cpf;

  @Column(nullable = false)
  private String address;

  @Column(length = 15)
  private String phone;

  @Column(nullable = false)
  private LocalDate dateBirth;

  private OffsetDateTime dateRegister;

  @PrePersist
  private void prePersist() {
    setDateRegister(OffsetDateTime.now());
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
