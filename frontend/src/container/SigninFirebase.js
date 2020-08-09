/**
 * Signin Firebase
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import {Form, FormGroup} from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import TextField from "@material-ui/core/TextField";

// components
import {
    SessionSlider
} from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
    signinUserInFirebase,
    signinUserWithGoogle,
    signinUserWithGithub,
} from 'Actions';
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";


class Signin extends Component {

    state = {
        email: '',
        password: '',
        loginError: false,
        loginErrorMessage: '',
        loginEmailIsEmpty: false,
        loginPWIsEmpty: false,
    };

    /**
     * On User Login
     */
    onUserLogin() {
        if (this.state.email !== '' && this.state.password !== '') {
            this.setState({loginEmailIsEmpty: false, loginPWIsEmpty: false});
            this.props.signinUserInFirebase(this.state, this.props.history);
        } else {
            if (email === '')
                this.setState({loginEmailIsEmpty: true});
            if (password === '')
                this.setState({loginPWIsEmpty: true});
        }
    }

    /**
     * On User Sign Up
     */
    onUserSignUp() {
        this.props.history.push('/signup');
    }

    updateInputVal = (e) => {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    };

    handleLoginErrorClose = () => {
        this.setState({
            loginError: false
        });
    };

    render() {
        const {
            email,
            password,
            loginError,
            loginErrorMessage,
            loginEmailIsEmpty,
            loginPWIsEmpty,
        } = this.state;
        const {loading} = this.props;
        return (
            <QueueAnim type="bottom" duration={2000}>
                <div className="rct-session-wrapper">
                    {loading &&
                    <LinearProgress/>
                    }
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <div className="session-logo">
                                        <Link to="/">
                                            <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid"
                                                 width="110" height="35"/>
                                        </Link>
                                    </div>
                                    <div>
                                        <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                                        <Button variant="raised" className="btn-light"
                                                onClick={() => this.onUserSignUp()}>Sign Up</Button>
                                    </div>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="session-inner-wrapper">
                        <div className="container">
                            <div className="row row-eq-height">
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <div className="session-body text-center">
                                        <div className="session-head mb-30">
                                            <h2 className="font-weight-bold">Get started with {AppConfig.brandName}</h2>
                                            <p className="mb-0">Automate your designs with {AppConfig.brandName}</p>
                                        </div>
                                        <Collapse in={loginError}>
                                            <Alert severity="error" onClose={() => this.handleLoginErrorClose()}>
                                                <AlertTitle>Login Error</AlertTitle>
                                                {loginErrorMessage}
                                            </Alert>
                                        </Collapse>
                                        <Form>
                                            <FormGroup>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    error={loginEmailIsEmpty}
                                                    color="primary"
                                                    variant="filled"
                                                    InputProps={{disableUnderline: true}}
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={email}
                                                    onChange={e => this.updateInputVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <TextField
                                                    variant="filled"
                                                    margin="normal"
                                                    color="primary"
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
                                            </FormGroup>
                                            <FormGroup className="mb-15">
                                                <Button
                                                    color="primary"
                                                    className="btn-info btn-block text-white w-100"
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => this.onUserLogin()}
                                                >
                                                    Sign In
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                        <p className="mb-20">OR</p>
                                        <Button
                                            variant="outlined"
                                            mini
                                            className="btn-google mr-15 mb-20 text-white"
                                            onClick={() => this.props.signinUserWithGoogle(this.props.history)}
                                        >
                                            <i className="zmdi zmdi-google"></i>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            mini
                                            className="btn-instagram mr-15 mb-20 text-white"
                                            onClick={() => this.props.signinUserWithGithub(this.props.history)}
                                        >
                                            <i className="zmdi zmdi-github-alt"></i>
                                        </Button>
                                        <p className="text-muted">By signing up you agree to our <a target="_blank"
                                                                                                    href="#/terms-condition"
                                                                                                    className="text-muted">Terms
                                            of Service</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-5 col-md-5 col-lg-4">
                                    <SessionSlider/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}

// map state to props
const mapStateToProps = ({authUser}) => {
    const {user, loading} = authUser;
    return {user, loading}
};

export default connect(mapStateToProps, {
    signinUserInFirebase,
    signinUserWithGoogle,
    signinUserWithGithub,
})(Signin);
