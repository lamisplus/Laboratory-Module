package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(9)
@Installer(name = "Clean up orphaned laboratory data",
        description = "Archive laboratory records that reference non-existent patients",
        version = 2)
public class SchemaInstaller10 extends AcrossLiquibaseInstaller {
    public SchemaInstaller10() {
        super("classpath:installers/laboratory/schema/schema-10.xml");
    }
} 