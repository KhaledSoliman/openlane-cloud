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
        minHeight: 54,
        '&:hover': {
            boxShadow: 'none'
        },
    },
});

class JobSubmission extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        repo: '',
        repoIsEmpty: false,
    };

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value,
            repoIsEmpty: false,
        });
    }


    handleJobSubmission = () => {
        if(this.state.repo !== '') {
            this.props.firebase.auth.onAuthStateChanged((user) => {
                user.getIdToken().then((token) => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:3001/jobs',
                        headers: {
                            'Authorization': token
                        },
                        data: {
                            idToken: token,
                            job: {
                                email: user.email,
                                repoURL: this.state.repo,
                                regToken: this.props.deviceToken,
                            }
                        }
                    }).then((res) => {
                        this.props.handleAddJobClose();
                        this.props.handleJobNotification(true);
                    }).catch(console.log);
                }).catch(console.log);
            })
        }
        else{
            this.setState({repoIsEmpty: true})
        }
    };

    render() {
        const {classes} = this.props;
        const {
            repo,
            repoIsEmpty,
        } = this.state;

        return (
            <>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Submit Job</Typography>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs="12">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={repoIsEmpty}
                                id="repo"
                                label="Github Repository"
                                name="repo"
                                autoComplete="repo"
                                value={repo}
                                onChange={e => this.updateInputVal(e)}
                            />
                        </Grid>
                        <Grid item>
                            <div align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => this.handleJobSubmission()}
                                className={classes.submit}>
                                Submit
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(withFirebase(JobSubmission));
