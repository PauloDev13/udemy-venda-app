package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
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
//
//  @PostMapping
//  public ResponseEntity<ProductResponseDto> save(@RequestBody ProductRequestDto productDto) {
//    return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(productDto));
//  }

  @PostMapping
  public ResponseEntity<ProductResponseDto> saveProduct(@RequestBody ProductRequestDto productDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(productDto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductResponseDto> update(
      @PathVariable Long id,
      @RequestBody ProductRequestDto productDto
  ) {
    return ResponseEntity.ok(productService.update(id, productDto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
