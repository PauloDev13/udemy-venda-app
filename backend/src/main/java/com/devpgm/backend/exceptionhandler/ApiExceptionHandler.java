package com.devpgm.backend.exceptionhandler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(NegocioException.class)
  public ResponseEntity<Object> handleNegocio(NegocioException ex, WebRequest request) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    CustomException customException = new CustomException(
        status.value(), LocalDateTime.now(), ex.getMessage()
    );

    return handleExceptionInternal(ex, customException, new HttpHeaders(), status, request);
  }

}
