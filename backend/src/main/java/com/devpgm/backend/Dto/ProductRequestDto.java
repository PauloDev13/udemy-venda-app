package com.devpgm.backend.Dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductRequestDto implements Serializable {
  private final String sku;
  private final String name;
  private final String description;
  private final BigDecimal price;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

}
