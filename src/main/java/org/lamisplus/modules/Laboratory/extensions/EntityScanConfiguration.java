package org.lamisplus.modules.laboratory.extensions;

import com.foreach.across.core.annotations.ModuleConfiguration;
import com.foreach.across.modules.hibernate.provider.HibernatePackageConfigurer;
import com.foreach.across.modules.hibernate.provider.HibernatePackageRegistry;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.laboratory.domain.LaboratoryDomain;

@Slf4j
@ModuleConfiguration({"AcrossHibernateJpaModule"})
public class EntityScanConfiguration implements HibernatePackageConfigurer {

    public EntityScanConfiguration() {
    }

    public void configureHibernatePackage(HibernatePackageRegistry hibernatePackageRegistry) {
        hibernatePackageRegistry.addPackageToScan(LaboratoryDomain.class);
    }
}
