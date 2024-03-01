package org.lamisplus.modules.Laboratory.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class LabOrderListMetaDataDTO {
    private  long totalRecords;
    private Integer totalPages;
    private Integer pageSize;
    private Integer currentPage;
    private List<PendingOrderDTO> records;
}
