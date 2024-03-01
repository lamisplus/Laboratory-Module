package org.lamisplus.modules.laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "schema-installer-laboratory-update-2",
        description = "Add tb lab tests",
        version = 1)
public class SchemaInstaller2 extends AcrossLiquibaseInstaller {
    public SchemaInstaller2() {
        super("classpath:installers/laboratory/schema/schema-2.xml");
    }
}
