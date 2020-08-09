import React, {useState} from 'react';
import {Button, Grid, Container, TextField, Box, Tooltip, Typography, Link, colors} from '@material-ui/core'
import {SignIn, SignUp, ForgotPassword} from './components';
import withStyles from "@material-ui/core/styles/withStyles";
import FirebaseContext, {withFirebase} from "../../services/firebase/context";
import landingImage from '../../assets/images/undraw_programming_2svr.svg';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";

const styles = theme => ({
    card: {
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        boxShadow: 'none'
    },

    sideBar: {
        color: 'white',
        backgroundColor: 'rgb(48,48,48)',
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
    },

    typography: {
        marginTop: 25,
    },

    main: {
        backgroundColor: 'rgb(245,245,245)',
        padding: 40,
        position: 'relative',
        overflow: 'hidden',
    },

    info: {
        marginTop: 75,
        marginLeft: 50,
    },

    description: {
        marginTop: 50,
        maxWidth: '60%',
    },

    button: {
        minHeight: 50,
        color: 'black',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        },
    },
    image: {
        maxWidth: '100%',
        width: 700,
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',

    },
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
        color: 'white',
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

class Home extends React.Component {
    constructor(props) {
        super(props);
        const self = this;
        this.props.firebase.auth.onAuthStateChanged((user) => {
            self.setState({user: user});
        })
    }

    componentDidMount() {
    }

    state = {
        value: 0,
        forgotPasswordClicked: false,
    };

    handleLoginSuccess = () => {
        this.props.history.push("/dashboard");
    };

    handleSignOutSuccess = (bool) => {
        this.setState({signOutSuccess: bool});
    };

    handleSignOut = (firebase) => {
        firebase.doSignOut().then(() => {
            this.setState({user: null});
            this.handleSignOutSuccess(true);
        }).catch((err) => {
            console.log(err);
        });
    };

    handleSignUpSuccess = () => {
        this.props.history.push("/dashboard");
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

    forgotPasswordOpen = () => {
        this.setState({
            forgotPasswordClicked: true
        });
    };

    forgotPasswordClose = () => {
        this.setState({
            forgotPasswordClicked: false
        });
    };

    render() {

        const {classes} = this.props;
        const {
            value,
            forgotPasswordClicked,
        } = this.state;
        return (
            <>
                <Box display="flex" justifyContent="center" alignItems="stretch" height="100vh" width="100vw">
                    <Box flexGrow={8} className={classes.main}>
                        {/*<Typography variant="body1">OpenLANE Cloud Runner</Typography>*/}
                        <Box className={classes.info} justifyContent="start"
                             alignItems="start">
                            <Typography display="block" variant="h1">OpenLane</Typography>
                            <Typography display="block" variant="h1">Cloud Runner</Typography>
                            <div className={classes.description}>
                                <Typography display="block" variant="h6">Automate your design flow
                                    using OpenLANE Cloud Runner. The open-source solution that will
                                    allow you to deploy, monitor, and modify your OpenLane
                                    designs.</Typography>
                            </div>
                        </Box>
                        <img
                            alt="Landing Image"
                            className={classes.image}
                            src={landingImage}
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexGrow={1}
                         className={classes.sideBar}>
                        {forgotPasswordClicked ?
                            <ForgotPassword forgotPasswordClose={this.forgotPasswordClose}/> :
                            <Grid container direction="column">
                                <TabContext value={value}>
                                    <StyledTabs
                                        value={value}
                                        onChange={(e, newVal) => this.handleChange(e, newVal)}
                                        centered
                                    >
                                        <StyledTab label="Sign In" {...this.a11yProps(0)}/>
                                        <StyledTab label="Sign Up" {...this.a11yProps(1)}/>
                                    </StyledTabs>

                                    <TabPanel value={0}>
                                        <Grid item>
                                            <SignIn handleLoginSuccess={this.handleLoginSuccess} forgotPasswordOpen={this.forgotPasswordOpen}/>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={1}>
                                        <Grid item>
                                            <SignUp handleSignUpSuccess={this.handleSignUpSuccess}/>
                                        </Grid>
                                    </TabPanel>
                                </TabContext>
                            </Grid>
                        }
                    </Box>
                </Box>
            </>
        );
    }
}

export default withStyles(styles)(withFirebase(Home));
