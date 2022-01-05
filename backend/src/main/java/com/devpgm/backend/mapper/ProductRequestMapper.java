package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.model.Product;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ProductRequestMapper {
  Product dtoToProduct(ProductRequestDto productRequestDto);

  ProductRequestDto productToDto(Product product);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateProductDto(ProductRequestDto productRequestDto, @MappingTarget Product product);
}
