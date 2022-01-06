package com.devpgm.backend;

import com.devpgm.backend.model.Product;
import com.devpgm.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.Arrays;

@SpringBootApplication
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

//  @Bean
//  CommandLineRunner initDatabase(ProductRepository productRepository) {
//    return args -> {
//      productRepository.deleteAll();
//
//      Product p = new Product();
//      p.setSku("13567");
//      p.setName("TV LG 20 polegadas");
//      p.setDescription("TV marca LG 20 polegadas modelo X98U");
//      p.setPrice(new BigDecimal("600.50"));
//
//      productRepository.save(p);
//    };
//  }

}
