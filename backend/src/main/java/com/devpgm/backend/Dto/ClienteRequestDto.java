package com.devpgm.backend.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ClienteRequestDto implements Serializable {
  private final String name;
  private final String email;
  private final String cpf;
  private final String address;
  private final String phone;

  @JsonFormat(pattern = "dd/MM/yyyy")
  private final LocalDate dateBirth;
}
