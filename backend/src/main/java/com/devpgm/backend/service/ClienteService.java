package com.devpgm.backend.service;

import com.devpgm.backend.exceptionhandler.NegocioException;
import com.devpgm.backend.model.Cliente;
import com.devpgm.backend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ClienteService {
  private final ClienteRepository clienteRepository;

  public List<Cliente> listAllClientes() {
    return clienteRepository.findAll();
  }

  public Cliente findClienteById(Long id) {
    return clienteRepository.findById(id)
        .orElseThrow(() -> new NegocioException(
            String.format("Cliente com ID: %s não cadastrado", id)
        ));
  }

  @Transactional
  public Cliente saveCliente(Cliente cliente) {
    isDuplicateEmail(cliente);
    return clienteRepository.save(cliente);
  }

  public void delete(Long id) {
    findClienteById(id);
    clienteRepository.deleteById(id);
  }

  // Métodos auxiliares

  private void isDuplicateEmail(Cliente cliente) {
    Cliente findCliente = clienteRepository.findByEmail(cliente.getEmail());

    if (findCliente != null && !Objects.equals(findCliente.getId(), cliente.getId())) {
      throw new NegocioException(String.format(
          "Já existe um cliente cadastrado para o Email: %s - (%s)", cliente.getEmail(),
          findCliente.getName().toUpperCase())
      );
    }
  }

//  private void isDuplicateSku(Cliente product) {
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
