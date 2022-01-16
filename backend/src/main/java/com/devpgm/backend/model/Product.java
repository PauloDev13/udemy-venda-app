package com.devpgm.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String sku;

  @Column(length = 100, nullable = false)
  private String name;

  private String description;

  @Column(precision = 16, scale = 2, nullable = false)
  private BigDecimal price;

  @Column(name = "date_created")
  private OffsetDateTime createdAt;

  @Column(name = "date_updated")
  private OffsetDateTime updatedAt;

  @PrePersist
  public void prePersist() {
    setCreatedAt(OffsetDateTime.now());
    
    if (getUpdatedAt() == null) {
      setUpdatedAt(OffsetDateTime.now());
    }
  }

  @PreUpdate
  public void preUpdate() {
    setUpdatedAt(OffsetDateTime.now());
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
