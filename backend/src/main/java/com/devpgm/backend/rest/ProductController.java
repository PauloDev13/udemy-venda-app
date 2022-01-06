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
@CrossOrigin("http://localhost:3000/")
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<ProductResponseDto>> getAll() {
    return ResponseEntity.ok(productService.getAll());
  }

  @GetMapping("{id}")
  public ResponseEntity<ProductResponseDto> getById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getById(id));
  }

  @PostMapping
  public ResponseEntity<ProductResponseDto> save(@RequestBody ProductRequestDto productDto) {
    return ResponseEntity.ok(productService.save(productDto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductResponseDto> update(
      @PathVariable Long id,
      @RequestBody ProductRequestDto productDto
  ) {
    return ResponseEntity.ok(productService.update(id, productDto));
  }
}
