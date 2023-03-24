package org.lamisplus.modules.Laboratory.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "lims-pcr-lab tables",
        description = "Installs the required lims pcr labs tables",
        version = 1)
public class LimsPCRLabTable extends AcrossLiquibaseInstaller {
    public LimsPCRLabTable() {
        super("classpath:installers/laboratory/schema/schema-4.xml");
    }
}