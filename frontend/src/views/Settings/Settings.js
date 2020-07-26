import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {colors, Grid} from '@material-ui/core';

import {Notifications, Password, Apps} from './components';
import withStyles from "@material-ui/core/styles/withStyles";
import {withFirebase} from "../../services/firebase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    }
});

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: colors.amber[500],
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0,
    }

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
        const {classes} = this.props;
        const {
            value,
        } = this.state;

        return (
            <div className={classes.root}>
                <TabContext value={value}>
                    <StyledTabs
                        value={value}
                        onChange={(e, newVal) => this.handleChange(e, newVal)}
                        centered
                    >
                        <StyledTab label="General" {...this.a11yProps(0)}/>
                        <StyledTab label="Apps" {...this.a11yProps(1)}/>
                        <StyledTab label="Notifications" {...this.a11yProps(2)}/>
                    </StyledTabs>

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

export default withStyles(styles)(Settings);
