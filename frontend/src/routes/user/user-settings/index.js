import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import {Notifications, Password, Apps} from './components';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";

class UserSettings extends Component {

    state = {
        value: 0,
    };

    handleChange = (e, newVal) => {
        this.setState({value: newVal});
    };

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `styled-tabpanel-${index}`,
        };
    };

    render() {
        const {value} = this.state;
        return (
            <div>
                <TabContext value={value}>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        value={value}
                        onChange={(e, newVal) => this.handleChange(e, newVal)}
                        centered
                    >
                        <Tab label="General" {...this.a11yProps(0)}/>
                        <Tab label="Apps" {...this.a11yProps(1)}/>
                        <Tab label="Notifications" {...this.a11yProps(2)}/>
                    </Tabs>

                    <TabPanel value={0}>
                        <Grid container justify="center">
                            <Password/>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Grid container justify="center">
                            <Apps/>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={2}>
                        <Grid container justify="center">
                            <Notifications/>
                        </Grid>
                    </TabPanel>
                </TabContext>
            </div>
        );
    }
};

export default UserSettings;
