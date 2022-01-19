package com.devpgm.backend.repository;

import com.devpgm.backend.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
  Cliente findByEmail(String email);

  Cliente findByCpf(String cpf);

  Page<Cliente> findByCpfOrName(String cpf, String name, Pageable pageable);

  @Query("SELECT c FROM Cliente c WHERE UPPER(c.name) LIKE :name AND c.cpf LIKE :cpf")
  Page<Cliente> buscarPorNomeCpf(
      @Param("name") String name,
      @Param("cpf") String cpf,
      Pageable pageable
  );
}
