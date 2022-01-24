package com.devpgm.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "item_venda")
public class ItemVenda {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "id_venda", nullable = false,
      foreignKey = @ForeignKey(name = "fk_venda"))
  private Venda venda;

  @ManyToOne
  @JoinColumn(name = "id_produto", nullable = false,
      foreignKey = @ForeignKey(name = "fk_produto"))
  private Product produto;

  @Column(nullable = false)
  private Integer quantidade;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ItemVenda itemVenda = (ItemVenda) o;
    return Objects.equals(id, itemVenda.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
