package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(8)
@Installer(name = "Update lab tests",
        description = "update lab tests",
        version = 2)
public class SchemaInstaller9 extends AcrossLiquibaseInstaller {
    public SchemaInstaller9() {
        super("classpath:installers/laboratory/schema/schema-9.xml");
    }
}
