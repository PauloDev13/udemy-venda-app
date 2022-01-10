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
import java.util.Objects;
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
        .map(responseMapper::productToDto)
        .collect(Collectors.toList());
  }

  public ProductResponseDto getById(Long id) {
    Product product = productRepository.findById(id).orElseThrow(
        () -> new RuntimeException(String.format("Produto com ID: %s não cadastrado", id)));
    return responseMapper.productToDto(product);
  }

  public ProductResponseDto save(ProductRequestDto productDto) {
    isDuplicateProduct(requestMapper.dtoToProduct(productDto));
    Product productSaved = productRepository.save(requestMapper.dtoToProduct(productDto));
    return responseMapper.productToDto(productSaved);
  }

  public ProductResponseDto update(Long id, ProductRequestDto productDto) {
    Product productUpdated = responseMapper.dtoToProduct(getById(id));
    requestMapper.updateProductDto(productDto, productUpdated);
    isDuplicateProduct(productUpdated);
    return responseMapper.productToDto(productRepository.save(productUpdated));
  }

  public void delete(Long id) {
    getById(id);
    productRepository.deleteById(id);
  }
  // Métodos auxiliares

  private void isDuplicateProduct(Product product) {
    Product findProduct = productRepository.findBySku(product.getSku());

    if (findProduct != null && !Objects.equals(findProduct.getId(), product.getId())) {
      throw new RuntimeException(String.format("Produto com SKU: %s já existe", product.getSku()));
    }

  }
}
