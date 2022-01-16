package com.devpgm.backend.service;

import com.devpgm.backend.exceptionhandler.NegocioException;
import com.devpgm.backend.model.Product;
import com.devpgm.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ProductService {
  private final ProductRepository productRepository;

  public List<Product> listAllProducts() {
    return productRepository.findAll();
  }

  public Product findProductById(Long id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new NegocioException(
            String.format("Produto com ID: %s não cadastrado", id)
        ));
  }

  @Transactional
  public Product saveProduct(Product product) {
    isDuplicateSku(product);
    return productRepository.save(product);
  }

  public void delete(Long id) {
    findProductById(id);
    productRepository.deleteById(id);
  }

  // Métodos auxiliares

  private void isDuplicateSku(Product product) {
    Product findProduct = productRepository.findBySku(product.getSku());

    if (findProduct != null && !Objects.equals(findProduct.getId(), product.getId())) {
      throw new NegocioException(String.format(
          "Já existe um produto cadastrado para o SKU: %s - (%s)", product.getSku(),
          findProduct.getName().toUpperCase())
      );
    }
  }

//  private void isDuplicateSku(Product product) {
//    boolean skuUsed = productRepository.findBySku(product.getSku())
//        .stream()
//        .anyMatch(productExist -> !productExist.equals(product));
//
//    if (skuUsed) {
//      throw new NegocioException(String.format(
//          "O Produto %s já está cadastrado para o SKU: %s", product.getName(), product.getSku()
//      ));
//    }
//  }

}
