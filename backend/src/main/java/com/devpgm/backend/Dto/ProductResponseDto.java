package com.devpgm.backend.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductResponseDto implements Serializable {
  private final Long id;
  private final String sku;
  private final String name;
  private final String description;
  private final BigDecimal price;

  @JsonFormat(pattern = "dd/MM/yyyy")
  private final LocalDate createdAt;
}
