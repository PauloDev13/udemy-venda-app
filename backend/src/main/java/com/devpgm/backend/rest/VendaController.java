package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.VendaRequestDto;
import com.devpgm.backend.Dto.VendaResponseDto;
import com.devpgm.backend.mapper.VendaRequestMapper;
import com.devpgm.backend.mapper.VendaResponseMapper;
import com.devpgm.backend.model.Venda;
import com.devpgm.backend.service.RelatorioVendaService;
import com.devpgm.backend.service.VendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendaController {
  private final VendaService vendaService;
  private final RelatorioVendaService relatorioService;
  private final VendaRequestMapper requestMapper;
  private final VendaResponseMapper responseMapper;

  @PostMapping
  public ResponseEntity<VendaResponseDto> saveVenda(@RequestBody VendaRequestDto vendaDto) {
    Venda vendaSaved = vendaService.saveVenda(requestMapper.dtoToVendaRequest(vendaDto));
    return new ResponseEntity<>(responseMapper.vendaResponseToDto(vendaSaved), HttpStatus.CREATED);
  }

  @GetMapping("/relatorio-vendas")
  public ResponseEntity<byte[]> relatorioVendas() {
    var relatorioGerado = relatorioService.gerarRelatorio();
    var headers = new HttpHeaders();
    var fileName = "relatorio-vendas.pdf";

    // headers.setContentDispositionFormData("inline; filename=\"" + fileName + "\"", fileName);
    headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=\"" + fileName);
    headers.setContentType(MediaType.APPLICATION_PDF);
    headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
    // return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(relatorioGerado);
    return new ResponseEntity<>(relatorioGerado, headers, HttpStatus.OK);
  }
}
