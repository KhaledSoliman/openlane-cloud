import React, {useState} from 'react';
import {AppBar, Toolbar, Button, Grid, Container, TextField, Box, Tooltip, Typography} from '@material-ui/core'
import {SignIn} from './components';
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from '@material-ui/styles';
import {NavLink} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import FirebaseContext from "../../services/firebase/context";
const styles = theme => ({
    root: {
        height: "auto",
        backgroundColor: theme.palette.grey[100]
    },
    card: {
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        boxShadow: 'none'
    },

    typography: {
        marginTop: 25,
    },

    button: {
        minHeight: 50,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        },
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        signInOpen: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
    };

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    handleSignInOpen() {
        this.setState({
            signInOpen: true
        })
    }

    handleSignInClose() {
        this.setState({
            signInOpen: false
        })
    }

    handleSignUp(e, firebase) {
        const {password, confirmPassword, email} = this.state;
        if(password === confirmPassword && email !== '')
            firebase.doCreateUserWithEmailAndPassword(email, password).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        const {classes} = this.props;
        const {
            signInOpen,
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
        } = this.state;
        return (
            <div className={classes.root}>
                <AppBar color="secondary" position="static">
                    <Toolbar>
                        <Grid justify="space-between" alignItems="center" container>
                            <Grid item><Typography color="primary">OpenLANE Cloud</Typography></Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => this.handleSignInOpen()}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="xl">
                    <div className="row">
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                            <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                                <Grid item xs={6}>
                                    <Container>
                                        <Typography variant="h1">Open Source Design Automation</Typography>

                                        <Typography variant="body1" className={classes.typography}>
                                            Automate your design flow using OpenLANE Cloud. The open-source solution
                                            that will
                                            allow you to deploy, monitor, and modify your OpenLANE designs.
                                        </Typography>
                                    </Container>
                                </Grid>
                                <Grid item xs={3}>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Grid container direction="row" justify="space-evenly"
                                                  alignItems="flex-start">
                                                <Grid item xs={10}>
                                                    <Typography variant="h3">Get Started!</Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        autoComplete="firstName"
                                                        name="firstName"
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        value={firstName}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="lastName"
                                                        value={lastName}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        margin="normal"
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={email}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Tooltip
                                                        title="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."
                                                        arrow>
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            id="password"
                                                            autoComplete="current-password"
                                                            value={password}
                                                            onChange={e => this.updateInputVal(e)}
                                                        />
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        type="password"
                                                        id="confirmPassword"
                                                        autoComplete="current-password"
                                                        value={confirmPassword}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Box mt={4}>
                                                        <FirebaseContext.Consumer>
                                                            {firebase => {
                                                                return <Button className={classes.button} variant="contained" fullWidth
                                                                               color="primary" onClick={(e) => this.handleSignUp(e,firebase)}>
                                                                    Sign Up Now!
                                                                </Button>;
                                                            }}
                                                        </FirebaseContext.Consumer>

                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Container>
                <Modal
                    open={signInOpen}
                    onClose={() => this.handleSignInClose()}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <SignIn/>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
