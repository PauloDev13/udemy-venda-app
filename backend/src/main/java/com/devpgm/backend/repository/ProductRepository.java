package com.devpgm.backend.repository;

import com.devpgm.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  // Optional<Product> findBySku(String sku);

  Product findBySku(String sku);
}