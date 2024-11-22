import React, { useState, useEffect } from "react";
import "../AdminView.css";
import PlayerAdminView from "./AdminViewComponents/PlayerAdminView.js";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const AdminView = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <> 
            <div>
                <Box 
                    sx={{ 
                        width: '100%', 
                        typography: 'body1', 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2
                    }}
                >
                    <TabContext value={value}>
                        <Box 
                            sx={{ 
                                borderBottom: 1, 
                                borderColor: 'divider', 
                                width: "fit-content"
                            }}
                        >
                            <TabList 
                                onChange={handleChange} 
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Players" value="1" />
                                <Tab label="Games" value="2" />
                            </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ width: "100%" }}>
                            <div>
                                <PlayerAdminView/>
                            </div>
                        </TabPanel>
                        <TabPanel value="2" sx={{ width: "100%" }}>
                            Soon to be Games panel
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );
};


export default AdminView;
