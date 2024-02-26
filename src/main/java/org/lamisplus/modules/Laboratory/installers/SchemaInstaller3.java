package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(3)
@Installer(name = "schema-installer-pcr-labs",
        description = "Add pcr labs and data",
        version = 1)
public class SchemaInstaller3 extends AcrossLiquibaseInstaller {
    public SchemaInstaller3() {
        super("classpath:installers/laboratory/schema/schema-3.xml");
    }
}
