package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(11)
@Installer(name = "Added patient category field in lab sample",
        description = "Added patient category field in lab sample",
        version = 1)
public class SchemaInstaller11 extends AcrossLiquibaseInstaller {
    public SchemaInstaller11() {
        super("classpath:installers/laboratory/schema/schema-11.xml");
    }
}