package com.devpgm.backend.rest;

import com.devpgm.backend.Dto.ClienteRequestDto;
import com.devpgm.backend.Dto.ClienteResponseDto;
import com.devpgm.backend.mapper.ClienteRequestMapper;
import com.devpgm.backend.mapper.ClienteResponseMapper;
import com.devpgm.backend.model.Cliente;
import com.devpgm.backend.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {
  private final ClienteService clienteService;
  private final ClienteResponseMapper responseMapper;
  private final ClienteRequestMapper requestMapper;


  @GetMapping
  public ResponseEntity<List<ClienteResponseDto>> getAll() {
    List<ClienteResponseDto> clientesDto = clienteService.listAllClientes()
        .stream()
        .map(responseMapper::clienteToDto)
        .collect(Collectors.toList());
    return new ResponseEntity<>(clientesDto, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<ClienteResponseDto> getClienteById(@PathVariable Long id) {
    Cliente cliente = clienteService.findClienteById(id);
    return new ResponseEntity<>(responseMapper.clienteToDto(cliente), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<ClienteResponseDto> saveCliente(@RequestBody ClienteRequestDto clienteDto) {
    Cliente clienteSaved = clienteService.saveCliente(requestMapper.dtoToCliente(clienteDto));
    return new ResponseEntity<>(responseMapper.clienteToDto(clienteSaved), HttpStatus.OK);
  }

  @PutMapping("{id}")
  public ResponseEntity<ClienteResponseDto> updateCliente(
      @PathVariable Long id,
      @RequestBody ClienteRequestDto clienteDto
  ) {

    Cliente cliente = responseMapper.dtoToCliente(getById(id));
    requestMapper.updateClienteRequestDto(clienteDto, cliente);

    Cliente clienteUpdated = clienteService.saveCliente(cliente);
    return new ResponseEntity<>(responseMapper.clienteToDto(clienteUpdated), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
    clienteService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  // Métodos auxiliares

  private ClienteResponseDto getById(@PathVariable Long id) {
    Cliente cliente = clienteService.findClienteById(id);
    return responseMapper.clienteToDto(cliente);
  }
}
