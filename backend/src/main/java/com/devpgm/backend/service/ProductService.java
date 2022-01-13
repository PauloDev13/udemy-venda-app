package com.devpgm.backend.service;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.exceptionhandler.NegocioException;
import com.devpgm.backend.mapper.ProductRequestMapper;
import com.devpgm.backend.mapper.ProductResponseMapper;
import com.devpgm.backend.model.Product;
import com.devpgm.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final ProductResponseMapper responseMapper;
  private final ProductRequestMapper requestMapper;

  public List<ProductResponseDto> getAll() {
//    try {
//      Thread.sleep(3000);
//    } catch (InterruptedException e) {
//      e.printStackTrace();
//    }
    return productRepository.findAll()
        .stream()
        .map(responseMapper::productToDto)
        .collect(Collectors.toList());
  }

  public ProductResponseDto getById(Long id) {
    Product product = productRepository.findById(id).orElseThrow(
        () -> new NegocioException(String.format("Produto com ID: %s não cadastrado", id)));
    return responseMapper.productToDto(product);
  }

  @Transactional
  public ProductResponseDto save(ProductRequestDto productDto) {
    isDuplicateSku(requestMapper.dtoToProduct(productDto));
    Product productSaved = productRepository.save(requestMapper.dtoToProduct(productDto));
    return responseMapper.productToDto(productSaved);
  }

  @Transactional
  public ProductResponseDto update(Long id, ProductRequestDto productDto) {
    Product productUpdated = responseMapper.dtoToProduct(getById(id));
    requestMapper.updateProductDto(productDto, productUpdated);
    isDuplicateSku(productUpdated);
    return responseMapper.productToDto(productRepository.save(productUpdated));
  }

  public void delete(Long id) {
    getById(id);
    productRepository.deleteById(id);
  }
  // Métodos auxiliares

//  private void isDuplicateProduct(Product product) {
//    Product findProduct = productRepository.findBySku(product.getSku());
//
//    if (findProduct != null && !Objects.equals(findProduct.getId(), product.getId())) {
//      throw new RuntimeException(String.format("Produto com SKU: %s já existe", product.getSku()));
//    }
//  }

  private void isDuplicateSku(Product product) {
    boolean skuUsed = productRepository.findBySku(product.getSku())
        .stream()
        .anyMatch(productExist -> !productExist.equals(product));
    if (skuUsed) {
      throw new NegocioException(String.format("Já existe um Produto com SKU: %s cadastrado", product.getSku()));
    }
  }

}
