package com.devpgm.backend.repository;

import com.devpgm.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
  Cliente findByEmail(String email);

  Cliente findByCpf(String cpf);
}
