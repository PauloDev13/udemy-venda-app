package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;

  @PostMapping
  public ResponseEntity<ProductResponseDto> save(@RequestBody ProductRequestDto productDto) {
    return ResponseEntity.ok(productService.save(productDto));
  }

  @GetMapping
  public ResponseEntity<List<ProductResponseDto>> getAll() {
    return ResponseEntity.ok(productService.getAll());
  }
}
