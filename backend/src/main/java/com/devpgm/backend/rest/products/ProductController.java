package com.devpgm.backend.rest.products;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @PostMapping
  public ResponseEntity<ProductRequestDTO> save(@RequestBody ProductRequestDTO productDto) {
    System.out.println(productDto);
    return ResponseEntity.ok(productDto);
  }
}
