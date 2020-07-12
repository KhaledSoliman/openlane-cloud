import React, {useState} from 'react';
import {Button, Grid, Container, TextField, Box, Tooltip, Typography, Link} from '@material-ui/core'
import {SignIn} from './components';
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {withRouter} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import FirebaseContext, {withFirebase} from "../../services/firebase/context";
import Header from "./components/Header";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Collapse from "@material-ui/core/Collapse";
import {AlertTitle} from "@material-ui/lab";
import Footer from "./components/Footer";
import axios from 'axios';

const styles = theme => ({
    root: {
        height: "auto",
        backgroundColor: 'rgb(241,244,246)'
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
        color: 'black',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        },
    },
    image: {
        marginTop: 100,
        textAlign: 'center',
        display: 'inline-block',
        maxWidth: '100%',
        width: 700
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        const self = this;
        this.props.firebase.auth.onAuthStateChanged((user) => {
            self.setState({user: user});
        })
    }

    state = {
        signInOpen: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        user: null,
        loginSuccess: false,
        signUpError: false,
        signUpErrorMessage: '',
        fNameEmpty: false,
        lNameEmpty: false,
        emailEmpty: false,
        pwOneEmpty: false,
        pwTwoEmpty: false,
    };

    handleLoginSuccess = (bool) => {
        this.setState({loginSuccess: bool});
    };

    updateInputVal = (e) => {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    handleSignOut = (firebase) => {
        firebase.doSignOut().then(() => {
            this.setState({user: null});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleSignInOpen = () => {
        this.setState({
            signInOpen: true
        })
    }

    handleSignInClose = () => {
        this.setState({
            signInOpen: false
        })
    }

    handleDBClick = () => {
        this.props.history.push("/dashboard");
    }


    handleSignUp = (e, firebase) => {
        const {firstName, lastName, password, confirmPassword, email} = this.state;
        if (password === confirmPassword && email !== '' && firstName !== '' && lastName !== '')
            firebase.doCreateUserWithEmailAndPassword(email, password).then((res) => {
                res.user.updateProfile({
                    displayName: firstName + " " + lastName
                }).then(() => {
                }).catch((err) => {
                    console.log(err);
                });
                console.log(res);
            }).catch((err) => {
                this.setState({signUpError: true, signUpErrorMessage: err.message});
                console.log(err);
            });
        else {
            if (email === '')
                this.setState({emailEmpty: true});
            if (firstName === '')
                this.setState({fNameEmpty: true});
            if (lastName === '')
                this.setState({lNameEmpty: true});
            if (password === '')
                this.setState({pwOneEmpty: true});
            if (confirmPassword === '')
                this.setState({pwTwoEmpty: true});
        }
    };

    handleSignUpErrorClose = () => {
        this.setState({
            signUpError: false
        });
    };

    render() {

        const {classes} = this.props;
        const {
            signInOpen,
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            user,
            loginSuccess,
            signUpError,
            signUpErrorMessage,
            fNameEmpty,
            lNameEmpty,
            emailEmpty,
            pwOneEmpty,
            pwTwoEmpty,
        } = this.state;
        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => {
                        return <Header firebase={firebase} user={user} handleSignOut={this.handleSignOut}
                                       handleSignInOpen={this.handleSignInOpen} handleDBClick={this.handleDBClick}/>
                    }}
                </FirebaseContext.Consumer>
                <Container maxWidth="xl">
                    <div className="row">
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                            <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                                <Grid item xs={6}>
                                    <Container>
                                        <Typography variant="h1">Open Source Design Automation</Typography>

                                        <Typography variant="h5" className={classes.typography}>
                                            Automate your design flow using OpenLANE Cloud. The open-source solution
                                            that will
                                            allow you to deploy, monitor, and modify your OpenLANE designs.
                                        </Typography>
                                        <Container alignItems="center">
                                            <img
                                                alt="Landing Image"
                                                className={classes.image}
                                                src="/images/undraw_programming_2svr.svg"
                                            />
                                        </Container>
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
                                                    <Collapse in={signUpError}>
                                                        <Alert severity="error" className={classes.alert}
                                                               onClose={() => this.handleSignUpErrorClose()}>
                                                            <AlertTitle>Sign Up Error</AlertTitle>
                                                            {signUpErrorMessage}
                                                        </Alert>
                                                    </Collapse>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        autoComplete="firstName"
                                                        name="firstName"
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        error={fNameEmpty}
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
                                                        error={lNameEmpty}
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
                                                        error={emailEmpty}
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
                                                            error={pwOneEmpty}
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
                                                        error={pwTwoEmpty}
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
                                                                return <Button className={classes.button}
                                                                               variant="contained" fullWidth
                                                                               color="primary"
                                                                               onClick={(e) => this.handleSignUp(e, firebase)}>
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
                <Footer/>
                <Modal
                    open={signInOpen}
                    onClose={() => this.handleSignInClose()}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <>
                        <SignIn handleLoginSuccess={this.handleLoginSuccess}
                                handleSignInClose={this.handleSignInClose}/>
                    </>
                </Modal>
                <Snackbar open={loginSuccess} anchorOrigin={{horizontal: 'center', vertical: 'top'}}
                          autoHideDuration={3000} onClose={() => this.handleLoginSuccess(false)}>
                    <Alert onClose={() => this.handleLoginSuccess(false)} severity="success">
                        Login successful
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles)(withFirebase(Home));
