package com.devpgm.backend.exceptionhandler;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CustomException {
  private Integer status;
  private LocalDateTime dataHora;
  private String titulo;
}
