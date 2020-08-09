import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from '@material-ui/core';
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";

class Password extends Component {
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
        } else {
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
            <Card>
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
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e) => this.handleChangePassword(e, "s")}
                        >
                            Update
                        </Button>
                    </CardActions>
                </form>
            </Card>
        );
    }
}

export default Password;
