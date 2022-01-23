package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.VendaRequestDto;
import com.devpgm.backend.Dto.VendaResponseDto;
import com.devpgm.backend.mapper.VendaRequestMapper;
import com.devpgm.backend.mapper.VendaResponseMapper;
import com.devpgm.backend.model.Venda;
import com.devpgm.backend.service.VendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendaController {
  private final VendaService vendaService;
  private final VendaRequestMapper requestMapper;
  private final VendaResponseMapper responseMapper;

  @PostMapping
  public ResponseEntity<VendaResponseDto> saveVenda(@RequestBody VendaRequestDto vendaDto) {
    Venda vendaSaved = vendaService.saveVenda(requestMapper.dtoToVendaRequest(vendaDto));
    return new ResponseEntity<>(responseMapper.vendaResponseToDto(vendaSaved), HttpStatus.CREATED);
  }
}
