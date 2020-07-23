import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withFirebase} from "../../../../services/firebase";
import axios from "axios";

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
    submit: {
        color: 'black',
        boxShadow: 'none',
        marginLeft: 20,
        minHeight: 54,
        '&:hover': {
            boxShadow: 'none'
        },
    },

    textField: {
        marginLeft: 0,
        marginRight: 0,
    }
});

class JobSubmission extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        repo: '',
    };

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    handleJobSubmission = () => {
        this.props.firebase.auth.onAuthStateChanged((user) => {
            user.getIdToken().then((token) => {
                axios.post(
                    'http://localhost:3001/jobs',
                    {
                        idToken: token,
                        job: {
                            email: user.email,
                            repoURL: this.state.repo,
                            regToken: this.props.regToken,
                        }
                    }
                ).then((res) => {
                    this.props.handleAddJobClose();
                    this.props.handleJobNotification(true);
                }).catch(console.log);
            }).catch(console.log);
        })
    };

    render() {
        const {classes} = this.props;
        const {
            repo,
        } = this.state;

        return (
            <>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Submit Job</Typography>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="repo"
                                label="Github Repository"
                                name="repo"
                                autoComplete="repo"
                                value={repo}
                                onChange={e => this.updateInputVal(e)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => this.handleJobSubmission()}
                                className={classes.submit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(withFirebase(JobSubmission));
