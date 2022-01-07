package com.devpgm.backend.repository;

import com.devpgm.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
  Product findBySku(String sku);
}