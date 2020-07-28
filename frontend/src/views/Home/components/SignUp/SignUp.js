import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FirebaseContext, {withFirebase} from "../../../../services/firebase/context";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from "@material-ui/core/Collapse";
import {StyledFirebaseAuth} from "react-firebaseui";
import {Box, Tooltip} from "@material-ui/core";

const styles = theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: 50,
    },
    submit: {
        color: 'black',
        boxShadow: 'none',
        borderRadius: 0,
        marginTop: 50,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
    },
    textField: {
        borderRadius: 0,
        backgroundColor: 'white',
    },
    formCheck: {
        color: 'white',
    },
    submit2: {
        color: 'black',
        boxShadow: 'none',
        marginTop: 20,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
    },
    iconButton: {
        color: 'black'
    },
});

class SignUp extends React.Component {
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
        signOutSuccess: false,
        signUpError: false,
        signUpErrorMessage: '',
        fNameEmpty: false,
        lNameEmpty: false,
        emailEmpty: false,
        pwOneEmpty: false,
        pwTwoEmpty: false,
    };

    constructor(props) {
        super(props);
    }

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    handleSignUpErrorClose = () => {
        this.setState({
            signUpError: false
        });
    };

    SignUpSuccess = (res) => {
        console.log(res);
        this.props.handleSignUpSuccess();
    };

    handleSignUp = (e, firebase) => {
        const {firstName, lastName, password, confirmPassword, email} = this.state;
        if (password === confirmPassword && password !== '' && confirmPassword !== '' && email !== '' && firstName !== '' && lastName !== '')
            firebase.doCreateUserWithEmailAndPassword(email, password).then((res) => {
                res.user.updateProfile({
                    displayName: firstName + " " + lastName
                }).then(() => {
                }).catch((err) => {
                    console.log(err);
                });
                this.SignUpSuccess(res);
            }).catch((err) => {
                this.setState({signUpError: true, signUpErrorMessage: err.message});
                console.log(err);
            });
        else {
            if(password === confirmPassword && password !== '' && confirmPassword !== '')
                this.setState({signUpError: true, signUpErrorMessage: "Passwords do not match!"});
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


    render() {
        const {classes, firebase} = this.props;
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            signUpError,
            signUpErrorMessage,
            fNameEmpty,
            lNameEmpty,
            emailEmpty,
            pwOneEmpty,
            pwTwoEmpty,
        } = this.state;
        return (
            <>
                <div>
                    <form className={classes.form} noValidate>
                        <Collapse in={signUpError}>
                            <Alert severity="error" onClose={() => this.handleSignUpErrorClose()}>
                                <AlertTitle>Sign Up Error</AlertTitle>
                                {signUpErrorMessage}
                            </Alert>
                        </Collapse>
                        <Grid container direction="column" justify="space-evenly">
                            <Grid item>
                                <TextField
                                    autoComplete="firstName"
                                    name="firstName"
                                    margin="normal"
                                    color="secondary"
                                    variant="filled"
                                    className={classes.textField}
                                    InputProps={{disableUnderline: true}}
                                    fullWidth
                                    error={fNameEmpty}
                                    id="firstName"
                                    label="First Name"
                                    value={firstName}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    color="secondary"
                                    variant="filled"
                                    className={classes.textField}
                                    InputProps={{disableUnderline: true}}
                                    margin="normal"
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
                            <Grid item>
                                <TextField
                                    color="secondary"
                                    variant="filled"
                                    className={classes.textField}
                                    InputProps={{disableUnderline: true}}
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
                            <Grid item>
                                <Tooltip
                                    title="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."
                                    arrow>
                                    <TextField
                                        color="secondary"
                                        variant="filled"
                                        className={classes.textField}
                                        InputProps={{disableUnderline: true}}
                                        margin="normal"
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
                            <Grid item>
                                <TextField
                                    color="secondary"
                                    variant="filled"
                                    className={classes.textField}
                                    InputProps={{disableUnderline: true}}
                                    margin="normal"
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
                            <FirebaseContext.Consumer>
                                {firebase => {
                                    return <Button className={classes.submit}
                                                   variant="contained"
                                                   fullWidth
                                                   color="primary"
                                                   onClick={(e) => this.handleSignUp(e, firebase)}>
                                        Sign Up Now!
                                    </Button>;
                                }}
                            </FirebaseContext.Consumer>
                        </Grid>
                    </form>
                </div>
            </>
        )
            ;
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withFirebase(SignUp));