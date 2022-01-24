package com.devpgm.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 15)
  private String sku;

  @Column(length = 100, nullable = false)
  private String name;

  private String description;

  @Column(precision = 16, scale = 2, nullable = false)
  private BigDecimal price;

  @Column(name = "date_created")
  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private LocalDateTime createdAt;

  @JsonIgnore
  @Column(name = "date_updated")
  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private LocalDateTime updatedAt;

  @PrePersist
  public void prePersist() {
    setCreatedAt(LocalDateTime.now());

    if (getUpdatedAt() == null) {
      setUpdatedAt(LocalDateTime.now());
    }
  }

  @PreUpdate
  public void preUpdate() {
    setUpdatedAt(LocalDateTime.now());
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Product product = (Product) o;
    return Objects.equals(id, product.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
