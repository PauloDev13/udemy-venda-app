package com.devpgm.backend.service;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.mapper.ProductRequestMapper;
import com.devpgm.backend.mapper.ProductResponseMapper;
import com.devpgm.backend.model.Product;
import com.devpgm.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final ProductResponseMapper responseMapper;
  private final ProductRequestMapper requestMapper;

  public List<ProductResponseDto> getAll() {
    return productRepository.findAll()
        .stream()
        .map(responseMapper::productToDto).collect(Collectors.toList());
  }

  public ProductResponseDto getById(Long id) {
    Product product = productRepository.findById(id).orElseThrow(
        () -> new RuntimeException("Produto com ID: %s não cadastrado")
    );
    return responseMapper.productToDto(product);
  }

  public ProductResponseDto save(ProductRequestDto productDto) {
    Product productSaved = productRepository.save(requestMapper.dtoToProduct(productDto));
    return responseMapper.productToDto(productSaved);
  }

  public ProductResponseDto update(Long id, ProductRequestDto productDto) {
    Product product = responseMapper.dtoToProduct(getById(id));
    requestMapper.updateProductDto(productDto, product);
    return responseMapper.productToDto(productRepository.save(product));
  }
}
