package org.lamisplus.modules.laboratory.domain.dto;

import java.time.LocalDate;

public interface SingleResultProjectionDTO {

    String getCurrentViralLoad();
    LocalDate getDateOfCurrentViralLoad();
}
