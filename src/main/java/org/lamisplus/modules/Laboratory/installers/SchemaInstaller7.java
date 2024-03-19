package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(7)
@Installer(name = "Remove lab tests",
        description = "remove lab tests",
        version = 2)
public class SchemaInstaller7 extends AcrossLiquibaseInstaller {
    public SchemaInstaller7() {
        super("classpath:installers/laboratory/schema/schema-7.xml");
    }
}
