package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.ClienteRequestDto;
import com.devpgm.backend.model.Cliente;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ClienteRequestMapper {
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "dateRegister", ignore = true)
  Cliente dtoToCliente(ClienteRequestDto clienteRequestDto);

  ClienteRequestDto clienteToDto(Cliente cliente);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "dateRegister", ignore = true)
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateClienteRequestDto(ClienteRequestDto clienteRequestDto, @MappingTarget Cliente cliente);
}
