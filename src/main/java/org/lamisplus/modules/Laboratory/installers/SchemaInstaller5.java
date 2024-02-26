package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(5)
@Installer(name = "Add missing lab tests",
        description = "Add missing lab tests",
        version = 1)
public class SchemaInstaller5 extends AcrossLiquibaseInstaller {
    public SchemaInstaller5() {
        super("classpath:installers/laboratory/schema/schema-5.xml");
    }
}
