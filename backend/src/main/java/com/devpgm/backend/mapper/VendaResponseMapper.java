package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.VendaResponseDto;
import com.devpgm.backend.model.Venda;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface VendaResponseMapper {
  Venda dtoToVendaResponse(VendaResponseDto vendaResponseDto);

  VendaResponseDto vendaResponseToDto(Venda venda);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateResponseVendaDto(VendaResponseDto vendaResponseDto, @MappingTarget Venda venda);
}
