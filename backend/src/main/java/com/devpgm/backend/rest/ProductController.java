package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.ProductRequestDto;
import com.devpgm.backend.Dto.ProductResponseDto;
import com.devpgm.backend.mapper.ProductRequestMapper;
import com.devpgm.backend.mapper.ProductResponseMapper;
import com.devpgm.backend.model.Product;
import com.devpgm.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
  private final ProductService productService;
  private final ProductResponseMapper responseMapper;
  private final ProductRequestMapper requestMapper;


  @GetMapping
  public ResponseEntity<List<ProductResponseDto>> getAll() {
    List<ProductResponseDto> productsDto = productService.listAllProducts()
        .stream()
        .map(responseMapper::productToDto)
        .collect(Collectors.toList());
    return new ResponseEntity<>(productsDto, HttpStatus.OK);
    //return ResponseEntity.ok(productsDto);
  }

  @GetMapping("{id}")
  public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
    Product product = productService.findProductById(id);
    return new ResponseEntity<>(responseMapper.productToDto(product), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<ProductResponseDto> saveProduct(@RequestBody ProductRequestDto productDto) {
    Product productSaved = productService.saveProduct(requestMapper.dtoToProduct(productDto));
    return new ResponseEntity<>(responseMapper.productToDto(productSaved), HttpStatus.OK);
    // return ResponseEntity.status(HttpStatus.CREATED).body(responseMapper.productToDto(productSaved));
  }

  @PutMapping("{id}")
  public ResponseEntity<ProductResponseDto> updateProduct(
      @PathVariable Long id,
      @RequestBody ProductRequestDto productDto
  ) {

    Product product = responseMapper.dtoToProduct(getById(id));
    requestMapper.updateProductDto(productDto, product);

    Product productUpdated = productService.saveProduct(product);
    return new ResponseEntity<>(responseMapper.productToDto(productUpdated), HttpStatus.OK);
    //return ResponseEntity.ok(responseMapper.productToDto(productUpdated));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  // Métodos auxiliares

  private ProductResponseDto getById(@PathVariable Long id) {
    Product product = productService.findProductById(id);
    return responseMapper.productToDto(product);
  }
}
