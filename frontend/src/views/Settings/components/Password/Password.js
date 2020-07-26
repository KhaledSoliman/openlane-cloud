import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FirebaseContext, {withFirebase} from "../../../../services/firebase/context";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField, Tooltip
} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {},
    card: {
        width: 600,
    },
    submit: {
        color: 'black',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        },
    },
});

class Password extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentPassword: '',
        password: '',
        confirmPassword: '',
        changeError: false,
        changeErrorMessage: '',
        currentEmpty: false,
        pwOneEmpty: false,
        pwTwoEmpty: false,
    };

    handleChangePassword = (e, firebase) => {
        e.preventDefault();
        const {currentPassword, password, confirmPassword} = this.state;

        if (currentPassword !== '' && password === confirmPassword && password !== '' && confirmPassword !== '') {
            const user = firebase.auth.currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
            firebase.doReauthentication(cred).then((res) => {
                console.log('success1');
                firebase.doPasswordUpdate(password).then((res) => {
                    console.log('success2');
                }).catch((err) => {
                    this.setState({changeError: true, changeErrorMessage: err.message});
                    console.log(err);
                });
            }).catch((err) => {
                this.setState({changeError: true, changeErrorMessage: err.message});
                console.log(err);
            });
        }
        else {
            if (password !== confirmPassword && password !== '' && confirmPassword !== '')
                this.setState({changeError: true, changeErrorMessage: "Passwords do not match. Please try again!"});
            if (currentPassword === '')
                this.setState({currentEmpty: true});
            if (password === '')
                this.setState({pwOneEmpty: true});
            if (confirmPassword === '')
                this.setState({pwTwoEmpty: true});
        }
    };

    handleChangeErrorClose = () => {
        this.setState({
            changeError: false
        });
    };

    updateInputVal = (e) => {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });

        this.setState({pwOneEmpty: false, pwTwoEmpty: false, currentEmpty: false})
    };

    render() {
        const {classes} = this.props;
        const {
            currentPassword,
            password,
            confirmPassword,
            currentEmpty,
            pwOneEmpty,
            pwTwoEmpty,
            changeError,
            changeErrorMessage,
        } = this.state;

        return (
            <Card className={classes.card}>
                <form>
                    <CardHeader
                        title="Update Password"
                    />
                    <Divider/>
                    <CardContent>
                        <Collapse in={changeError}>
                            <Alert severity="error" onClose={() => this.handleChangeErrorClose()}>
                                <AlertTitle>Error!</AlertTitle>
                                {changeErrorMessage}
                            </Alert>
                        </Collapse>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={currentEmpty}
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={e => this.updateInputVal(e)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={pwOneEmpty}
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => this.updateInputVal(e)}
                        />
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
                            value={confirmPassword}
                            onChange={e => this.updateInputVal(e)}
                        />
                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <FirebaseContext.Consumer>
                            {firebase => {
                                return <Button
                                    color="primary"
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={(e) => this.handleChangePassword(e, firebase)}
                                >
                                    Update
                                </Button>
                            }}
                        </FirebaseContext.Consumer>
                    </CardActions>
                </form>
            </Card>
        );
    }
};

Password.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(withFirebase(Password));
