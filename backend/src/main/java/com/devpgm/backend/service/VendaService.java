package com.devpgm.backend.service;

import com.devpgm.backend.model.ItemVendaRepository;
import com.devpgm.backend.model.Venda;
import com.devpgm.backend.repository.VendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class VendaService {
  private final VendaRepository vendaRepository;
  private final ItemVendaRepository itemVendaRepository;

  @Transactional
  public Venda saveVenda(Venda venda) {
    Venda vendaSaved = vendaRepository.save(venda);
    vendaSaved.getItens().forEach(itemVenda -> itemVenda.setVenda(venda));
    itemVendaRepository.saveAll(vendaSaved.getItens());
    return vendaSaved;
  }
}
