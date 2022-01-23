package com.devpgm.backend.model;

import com.devpgm.backend.Dto.enums.FormaPagamento;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "venda")
public class Venda {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "forma_pagamento", nullable = false, length = 20)
  private FormaPagamento formaPagamento;

  @ManyToOne
  @JoinColumn(name = "id_cliente", nullable = false,
      foreignKey = @ForeignKey(name = "fk_cliente"))
  private Cliente cliente;

  @OneToMany(mappedBy = "venda")
  private List<ItemVenda> itens = new ArrayList<>();

  @Column(name = "total_venda", nullable = false, precision = 16, scale = 2)
  private BigDecimal totalVenda;

  @Column(name = "data_cadastro")
  private LocalDate createdAt;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Venda venda = (Venda) o;
    return Objects.equals(id, venda.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}

