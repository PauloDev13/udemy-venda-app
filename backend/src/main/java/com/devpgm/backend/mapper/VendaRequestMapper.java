package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.VendaRequestDto;
import com.devpgm.backend.model.Venda;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface VendaRequestMapper {
  Venda dtoToVendaRequest(VendaRequestDto vendaRequestDto);

  VendaRequestDto vendaRequestToDto(Venda venda);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateRequestVendaDto(VendaRequestDto vendaRequestDto, @MappingTarget Venda venda);
}
