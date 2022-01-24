package com.devpgm.backend.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class ClienteResponseDto implements Serializable {
  private final Long id;
  private final String name;
  private final String email;
  private final String cpf;
  private final String address;
  private final String phone;

  @JsonFormat(pattern = "dd/MM/yyyy")
  private final LocalDate dateBirth;

  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private final LocalDateTime dateRegister;

  @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
  private final LocalDateTime updatedAt;

}
