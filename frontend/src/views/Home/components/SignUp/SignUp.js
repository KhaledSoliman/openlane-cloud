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

const styles = theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: 100,
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
        forgetPasswordClicked: false,
        email: '',
        password: '',
        loginError: false,
        loginErrorMessage: '',
        forgetError: false,
        forgetErrorMessage: '',
        loginEmailIsEmpty: false,
        loginPWIsEmpty: false,
        forgetIsEmpty: false,
    };

    constructor(props) {
        super(props);
        this.uiConfig =
            {
                signInFlow: 'popup',
                callbacks: {
                    signInSuccess: this.signInSuccess.bind(this)
                },
                signInOptions: [
                    props.firebase.authObj.GoogleAuthProvider.PROVIDER_ID,
                    props.firebase.authObj.GithubAuthProvider.PROVIDER_ID,
                ]
            }
    }

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    forgetPasswordOpen() {
        this.setState({
            forgotPasswordClicked: true
        });
    }

    forgetPasswordClose() {
        this.setState({
            forgotPasswordClicked: false
        });
    }

    signInSuccess(res) {
        console.log(res);
        this.props.handleSignInClose();
        this.props.handleLoginSuccess(true);
    }

    handleSignIn(e, firebase) {
        e.preventDefault();
        const {email, password} = this.state;
        if (password !== '' && email !== '')
            firebase.doSignInWithEmailAndPassword(email, password).then((res) => {
                this.signInSuccess(res);
            }).catch((err) => {
                this.setState({loginError: true, loginErrorMessage: err.message});
                console.log(err);
            });
        else {
            if (email === '')
                this.setState({loginEmailIsEmpty: true});
            if (password === '')
                this.setState({loginPWIsEmpty: true});
        }
    }

    handleForgetPassword(e, firebase) {
        e.preventDefault();
        const {email} = this.state;
        if (email !== '')
            firebase.doPasswordReset(email).then((res) => {
                this.forgetPasswordClose();
                this.props.handleSignInClose();
            }).catch((err) => {
                this.setState({forgetError: true, forgetErrorMessage: err.message});
                console.log(err);
            });
        else
            this.setState({forgetIsEmpty: true});
    }

    handleLoginErrorClose = () => {
        this.setState({
            loginError: false
        });
    };

    handleForgetErrorClose = () => {
        this.setState({
            forgetError: false
        });
    };

    render() {
        const {classes, firebase} = this.props;
        const {
            forgotPasswordClicked,
            email,
            password,
            loginError,
            loginErrorMessage,
            forgetError,
            forgetErrorMessage,
            loginEmailIsEmpty,
            loginPWIsEmpty,
            forgetIsEmpty,
        } = this.state;
        return (
            <>
                {!forgotPasswordClicked ?
                    <div>
                        <form className={classes.form} noValidate>
                            <Collapse in={loginError}>
                                <Alert severity="error" onClose={() => this.handleLoginErrorClose()}>
                                    <AlertTitle>Login Error</AlertTitle>
                                    {loginErrorMessage}
                                </Alert>
                            </Collapse>
                            <Grid container direction="column" justify="space-evenly">
                                <Grid item>
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        error={loginEmailIsEmpty}
                                        color="secondary"
                                        className={classes.textField}
                                        id="email"
                                        label="Email Address"
                                        InputProps={{disableUnderline: true}}
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => this.updateInputVal(e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        color="secondary"
                                        className={classes.textField}
                                        InputProps={{disableUnderline: true}}
                                        fullWidth
                                        error={loginPWIsEmpty}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={e => this.updateInputVal(e)}
                                    />
                                </Grid>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary"
                                                               className={classes.formCheck}/>}
                                            label={<Typography style={{color: 'white'}}>Remember me</Typography>}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" color="primary"
                                              onClick={() => this.forgetPasswordOpen()}>
                                            <Typography style={{color: '#ffc107'}}>Forgot Password?</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <FirebaseContext.Consumer>
                                    {firebase => {
                                        return <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={(e) => this.handleSignIn(e, firebase)}>
                                            Sign In
                                        </Button>
                                    }}
                                </FirebaseContext.Consumer>
                                <FirebaseContext.Consumer>
                                    {firebase => {
                                        return <StyledFirebaseAuth uiConfig={this.uiConfig}
                                                                   firebaseAuth={firebase.auth}/>
                                    }}
                                </FirebaseContext.Consumer>
                            </Grid>
                        </form>
                    </div> :
                    <div>
                        <Grid container direction="row" alignItems="center">
                            <Grid container item xs={3} justify="flex-start">
                                <IconButton className={classes.iconButton} onClick={() => this.forgetPasswordClose()}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </Grid>
                            <Grid container item xs={6} justify="center">
                                <Typography variant="h4">Reset your password</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body1" align="center">Enter your user account's verified email address and
                            we will send you a password reset link.</Typography>
                        <Collapse in={forgetError}>
                            <Alert severity="error" onClose={() => this.handleForgetErrorClose()}>
                                <AlertTitle>Error!</AlertTitle>
                                {forgetErrorMessage}
                            </Alert>
                        </Collapse>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            className={classes.textField}
                            autoComplete="email"
                            error={forgetIsEmpty}
                            value={email}
                            onChange={e => this.updateInputVal(e)}
                        />
                        <FirebaseContext.Consumer>
                            {firebase => {
                                return <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.submit2}
                                    onClick={(e) => this.handleForgetPassword(e, firebase)}>
                                    Send password reset email
                                </Button>
                            }}
                        </FirebaseContext.Consumer>
                    </div>
                }
            </>);
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withFirebase(SignUp));