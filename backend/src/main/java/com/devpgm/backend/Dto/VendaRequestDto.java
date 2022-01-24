package com.devpgm.backend.Dto;

import com.devpgm.backend.Dto.enums.FormaPagamento;
import com.devpgm.backend.model.Cliente;
import com.devpgm.backend.model.ItemVenda;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class VendaRequestDto implements Serializable {
  private final Cliente cliente;
  private final List<ItemVenda> itens;
  private final BigDecimal totalVenda;
  private final FormaPagamento formaPagamento;
  private final LocalDateTime createdAt;
}
