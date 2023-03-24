package org.lamisplus.modules.Laboratory.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import static com.foreach.across.modules.hibernate.jpa.repositories.EntityInterceptingJpaRepositoryFactoryBean.EntityInterceptorProxyPostProcessor.LOG;

public class LabUtils {
    public static final Integer PENDING_SAMPLE_COLLECTION = 0;
    public static final Integer SAMPLE_COLLECTED = 1;
    public static final Integer SAMPLE_TRANSFERRED = 2;
    public static final Integer SAMPLE_VERIFIED = 3;
    public static final Integer SAMPLE_REJECTED = 4;
    public static final Integer RESULT_REPORTED = 5;

    public static final Integer APPLICATION_CODE_SET = 1;
    public static final Integer LAB_TEST = 2;
    public static final Integer LAB_TEST_UNITS = 3;
    public static final Integer LAB_TEST_GROUP = 4;
    public static final Integer LAB_ORDER_STATUS = 5;
    public static final Integer SAMPLE_TYPE = 6;

    public static void LogInfo(String title, Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LOG.info(title+": " + objectMapper.writeValueAsString(object));
        } catch (JsonProcessingException exception) {
            LOG.info(title+": " + exception.getMessage());
        }
    }
}
