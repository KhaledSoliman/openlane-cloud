/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
} from 'Actions';

class Signin extends Component {

  state = {
    email: 'demo@example.com',
    password: 'test#123'
  }

  /**
   * On User Login
   */
  onUserLogin() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signinUserInFirebase(this.state, this.props.history);
    }
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push('/signup');
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading &&
            <LinearProgress />
          }
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                    </Link>
                  </div>
                  <div>
                    <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                    <Button variant="raised" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
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
                      <p className="mb-0">Most powerful ReactJS admin panel</p>
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="raised"
                          size="large"
                          onClick={() => this.onUserLogin()}>
                          Sign In
                        </Button>
                      </FormGroup>
                    </Form>
                    <p className="mb-20">or sign in with</p>
                    <Button mini variant="fab" className="btn-facebook mr-15 mb-20 text-white" onClick={() => this.props.signinUserWithFacebook(this.props.history)}>
                      <i className="zmdi zmdi-facebook"></i>
                    </Button>
                    <Button mini variant="fab" className="btn-google mr-15 mb-20 text-white" onClick={() => this.props.signinUserWithGoogle(this.props.history)}>
                      <i className="zmdi zmdi-google"></i>
                    </Button>
                    <Button mini variant="fab" className="btn-twitter mr-15 mb-20 text-white" onClick={() => this.props.signinUserWithTwitter(this.props.history)}>
                      <i className="zmdi zmdi-twitter"></i>
                    </Button>
                    <Button mini variant="fab" className="btn-instagram mr-15 mb-20 text-white" onClick={() => this.props.signinUserWithGithub(this.props.history)}>
                      <i className="zmdi zmdi-github-alt"></i>
                    </Button>
                    <p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
                    <p><a target="_blank" href="#/terms-condition" className="text-muted">Terms of Service</a></p>
                  </div>
                </div>
                <div className="col-sm-5 col-md-5 col-lg-4">
                  <SessionSlider />
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
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading }
}

export default connect(mapStateToProps, {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
})(Signin);
