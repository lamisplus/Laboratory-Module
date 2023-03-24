import React, {useEffect, useCallback, useState} from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import TabPanel from "./TabPanel";
import LabCodeSetting from "./LabCodeSetting";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Config(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

  return (
    <div>
      <Card >
        <CardContent>
            <hr/>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label="Facility Lab Number" {...a11yProps(0)} />
                {/*<Tab label="Sample Type" {...a11yProps(1)} />*/}
              </Tabs>
              <TabPanel value={value} index={0}>
                <LabCodeSetting />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
            </Box>
        </CardContent>
      </Card>
    </div>
  );
}



export default Config;
