package com.devpgm.backend.service;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RelatorioVendaService {
  private final DataSource dataSource;

  @Value("classpath:reports/relatorio-vendas.jrxml")
  private Resource relatorioVendasSource;

  @Value("classpath:reports/relatorio-vendas.jasper")
  private Resource relatorioVendasCompilado;

  public byte[] gerarRelatorio(Long clienteId, Date dataInicio, Date dataFim) {
    try {
      Connection connection = dataSource.getConnection();

      Map<String, Object> params = new HashMap<>();
      params.put("ID_CLIENTE", clienteId);
      params.put("DATA_INICIO", dataInicio);
      params.put("DATA_FINAL", dataFim);

      return JasperRunManager.runReportToPdf(
          relatorioVendasCompilado.getInputStream(), params, connection);

    } catch (SQLException | JRException | IOException e) {
      e.printStackTrace();
    }
    return null;
  }

//  public byte[] gerarRelatorioCompilado() {
//    try {
//      Connection connection = dataSource.getConnection();
//      // JasperReport compileReport = JasperCompileManager.compileReport(relatorioVendas.getInputStream());
//      Map<String, Object> params = new HashMap<>();
//      JasperPrint jasperPrint = JasperFillManager.fillReport(
//          relatorioVendasCompilado.getInputStream(), params, connection);
//      return JasperExportManager.exportReportToPdf(jasperPrint);
//
//    } catch (SQLException | JRException | IOException e) {
//      e.printStackTrace();
//    }
//    return null;
//  }

//  public byte[] gerarRelatorioCompilando() {
//    try {
//      Connection connection = dataSource.getConnection();
//      JasperReport compileReport = JasperCompileManager.compileReport(relatorioVendasSource.getInputStream());
//      Map<String, Object> params = new HashMap<>();
//      JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, params, connection);
//      return JasperExportManager.exportReportToPdf(jasperPrint);
//
//    } catch (SQLException | JRException | IOException e) {
//      e.printStackTrace();
//    }
//    return null;
//  }

}
