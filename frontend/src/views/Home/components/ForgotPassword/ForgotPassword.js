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
        marginTop: 20,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
    },
    alert: {
      marginTop: 10,
    },
    textField: {
        borderRadius: 0,
        backgroundColor: 'white',
    },
    formCheck: {
        color: 'white',
    },
    iconButton: {
        color: 'black'
    },
});

class ForgotPassword extends React.Component {
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

    handleForgetErrorClose = () => {
        this.setState({
            forgetError: false
        });
    };

    backClicked = () => {
        this.props.forgotPasswordClose();
    };

    render() {
        const {classes, firebase} = this.props;
        const {
            email,
            forgetError,
            forgetErrorMessage,
            forgetIsEmpty,
        } = this.state;
        return (
            <>
                <div>
                    <Grid container direction="row" alignItems="center">
                        <Grid container item xs={3} justify="flex-start">
                            <IconButton className={classes.iconButton} onClick={() => this.backClicked()} style={{color: '#ffc107'}}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </Grid>
                        <Grid container item xs={6} justify="center">
                            <Typography variant="h4" style={{color: '#ffc107'}}>Reset your password</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" align="center" style={{color: '#fff'}}>Enter your user account's verified email address and
                        we will send you a password reset link.</Typography>
                    <Collapse in={forgetError}>
                        <Alert severity="error" onClose={() => this.handleForgetErrorClose()} className={classes.alert}>
                            <AlertTitle>Error!</AlertTitle>
                            {forgetErrorMessage}
                        </Alert>
                    </Collapse>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        color="secondary"
                        variant="filled"
                        className={classes.textField}
                        InputProps={{disableUnderline: true}}
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
                                className={classes.submit}
                                onClick={(e) => this.handleForgetPassword(e, firebase)}>
                                Send password reset email
                            </Button>
                        }}
                    </FirebaseContext.Consumer>
                </div>
            </>);
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withFirebase(ForgotPassword));