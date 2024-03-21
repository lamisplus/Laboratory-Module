package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(8)
@Installer(name = "Update lab achived tests",
        description = "update lab achived tests",
        version = 2)
public class SchemaInstaller8 extends AcrossLiquibaseInstaller {
    public SchemaInstaller8() {
        super("classpath:installers/laboratory/schema/schema-8.xml");
    }
}
