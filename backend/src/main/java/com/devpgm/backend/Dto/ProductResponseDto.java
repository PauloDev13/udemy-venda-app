package com.devpgm.backend.Dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductResponseDto implements Serializable {
  private final Long id;
  private final String sku;
  private final String name;
  private final String description;
  private final BigDecimal price;
}
