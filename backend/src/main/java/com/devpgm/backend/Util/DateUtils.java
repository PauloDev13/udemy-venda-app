package com.devpgm.backend.Util;

import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {

  public static Date fromString(String dataString) {
    return fromString(dataString, false);
  }

  public static Date fromString(String dataString, boolean fimDoDia) {
    if (!StringUtils.hasText(dataString)) {
      return null;
    }
    var data = LocalDate.parse(dataString, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    LocalDateTime dataHora;

    if (fimDoDia) {
      dataHora = data.atTime(LocalTime.of(23, 59, 59));
    } else {
      dataHora = data.atStartOfDay();
    }

    var instant = dataHora.atZone(ZoneId.systemDefault()).toInstant();
    return Date.from(instant);
  }
}
