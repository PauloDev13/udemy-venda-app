package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.ClienteResponseDto;
import com.devpgm.backend.model.Cliente;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ClienteResponseMapper {
  Cliente dtoToCliente(ClienteResponseDto clienteResponseDto);

  ClienteResponseDto clienteToDto(Cliente cliente);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateClienteResponseDto(ClienteResponseDto clienteResponseDto, @MappingTarget Cliente cliente);
}
