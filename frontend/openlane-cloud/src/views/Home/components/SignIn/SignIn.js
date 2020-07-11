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


const styles = theme => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        padding: theme.spacing(2, 4, 3),
        paddingTop: 20,
        paddingBottom: 50,
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
        boxShadow: 'none',
        marginTop: 10,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
    },
    submit2: {
        boxShadow: 'none',
        marginTop: 20,
        minHeight: 45,
        '&:hover': {
            boxShadow: 'none'
        },
    },
});

class SignIn extends React.Component {
    state = {
        forgotPasswordClicked: false
    };

    constructor(props) {
        super(props);
    }

    forgotPasswordOpen() {
        this.setState({
            forgotPasswordClicked: true
        });
    }

    forgotPasswordClose() {
        this.setState({
            forgotPasswordClicked: false
        });
    }

    render() {
        const { classes } = this.props;
        const {forgotPasswordClicked} = this.state;

        return (
            <>
                {!forgotPasswordClicked ?
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <h4>Sign in to OpenLANE Cloud</h4>
                        <form className={classes.form} noValidate>
                            <Grid container direction="column" justify="space-evenly">
                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item>
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
                                        <Link href="#" variant="body2" onClick={() => this.forgotPasswordOpen()}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </form>
                    </Paper> :
                    <Paper  className={classes.paper2}>
                        <h5>Reset your password</h5>
                        <p align="center">Enter your user account's verified email address and we will send you a password reset link.</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit2}
                        >
                            Send password reset email
                        </Button>
                    </Paper>
                }
            </>);
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)

(
    SignIn
)
;