import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FirebaseContext from "../../../../services/firebase/context";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from "@material-ui/core/Collapse";


const styles = theme => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        padding: theme.spacing(2, 4, 3),
        paddingTop: 20,
        paddingBottom: 35,
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper2: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        padding: theme.spacing(2, 4, 3),
        paddingTop: 30,
        paddingBottom: 30,
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        color: 'black',
        boxShadow: 'none',
        marginTop: 20,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
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

class SignIn extends React.Component {
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

    handleSignIn(e, firebase) {
        e.preventDefault();
        const {email, password} = this.state;
        if (password !== '' && email !== '')
            firebase.doSignInWithEmailAndPassword(email, password).then((res) => {
                console.log(res);
                this.props.handleSignInClose();
                this.props.handleLoginSuccess(true);
            }).catch((err) => {
                this.setState({loginError: true, loginErrorMessage: err.message});
                console.log(err);
            });
        else{
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
        const {classes} = this.props;
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
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography variant="h4">Sign in to OpenLANE Cloud</Typography>
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
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        error={loginEmailIsEmpty ? true : false}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => this.updateInputVal(e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        error={loginPWIsEmpty ? true : false}
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
                                            control={<Checkbox value="remember" color="primary"/>}
                                            label="Remember me"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2" color="secondary"
                                              onClick={() => this.forgetPasswordOpen()}>
                                            Forgot Password?
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
                            </Grid>
                        </form>
                    </Paper> :
                    <Paper className={classes.paper2}>
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
                            autoComplete="email"
                            error={forgetIsEmpty ? true : false}
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
                    </Paper>
                }
            </>);
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SignIn);