package com.devpgm.backend.mapper;

import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.model.Product;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ProductResponseMapper {
  Product dtoToProduct(ProductResponseDto productResponseDto);

  ProductResponseDto productToDto(Product product);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateProductDto(ProductResponseDto productResponseDto, @MappingTarget Product product);
}
