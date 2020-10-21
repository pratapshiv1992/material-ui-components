import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTableWrapper from './DataTableWrapper';
import {userTableHeaders, projectTableHeaders} from '../utils/tableConfg';
import './App.css'

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const userApiConfig = {path:'/users', method:'get', data:{}}
const projectsApiConfig = {path:'/users', method:'get', data:{}}

export default function SimpleTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Projects" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <DataTableWrapper
                    columns={userTableHeaders}
                    apiConfig={userApiConfig}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataTableWrapper
                    columns={projectTableHeaders}
                    apiConfig={projectsApiConfig}
                    type='projects'
                />
            </TabPanel>
        </div>
    );
}
