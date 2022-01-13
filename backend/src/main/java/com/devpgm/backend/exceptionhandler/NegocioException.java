package com.devpgm.backend.exceptionhandler;

public class NegocioException extends RuntimeException {
  public NegocioException(String msg) {
    super(msg);
  }
}
