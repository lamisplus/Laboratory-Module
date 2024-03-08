package org.lamisplus.modules.laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(5)
@Installer(name = "Add lab tests",
        description = "Add lab tests",
        version = 2)
public class SchemaInstaller6 extends AcrossLiquibaseInstaller {
    public SchemaInstaller6() {
        super("classpath:installers/laboratory/schema/schema-6.xml");
    }
}
