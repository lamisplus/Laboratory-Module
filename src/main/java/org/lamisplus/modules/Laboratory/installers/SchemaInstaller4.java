package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(4)
@Installer(name = "schema-installer-new-pcr-labs",
        description = "Add new pcr labs and data",
        version = 2)
public class SchemaInstaller4 extends AcrossLiquibaseInstaller {
    public SchemaInstaller4() {
        super("classpath:installers/laboratory/schema/schema-4.xml");
    }
}
