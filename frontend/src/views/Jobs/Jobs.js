import React, {useState} from 'react';
import {JobsToolbar, JobsTable, JobSubmission} from './components';
import mockData from './data';
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {withFirebase} from "../../services/firebase";
import axios from "axios";

const styles = theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
});

class Jobs extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        addJobOpen: false,
        jobsData: [],
        jobNotification: false
    };

    componentDidMount() {
        this.handleQueryJobs();
    }

    handleQueryJobs() {
        this.props.firebase.auth.onAuthStateChanged((user) => {
            user.getIdToken().then((token) => {
                axios({
                    method: 'get',
                    url: 'http://localhost:3001/jobs',
                    headers: {
                        'Authorization': token
                    },
                }).then((res) => {
                    this.setState({
                        jobsData: res.data
                    });
                }).catch(console.log);
            }).catch(console.log);
        })
    };

    handleAddJobOpen = () => {
        this.setState({
            addJobOpen: true
        })
    };

    handleAddJobClose = () => {
        this.setState({
            addJobOpen: false
        })
    };

    handleJobNotification = (bool) => {
        this.setState({jobNotification: bool});
    };

    handleConsoleClick = () => {
        this.props.history.push("/console");
    };

    render() {
        const {classes} = this.props;
        const {
            addJobOpen,
            jobsData,
            jobNotification
        } = this.state;
        return (
            <div className={classes.root}>
                <JobsToolbar handleAddJobOpen={this.handleAddJobOpen}/>
                <div className={classes.content}>
                    <JobsTable jobs={jobsData} handleConsoleClick={this.handleConsoleClick}/>
                </div>
                <Modal
                    open={addJobOpen}
                    onClose={() => this.handleAddJobClose()}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <>
                        <JobSubmission handleAddJobClose={this.handleAddJobClose} handleJobNotification={this.handleJobNotification}/>
                    </>
                </Modal>
                <Snackbar open={jobNotification} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                          autoHideDuration={3000} onClose={() => this.handleJobNotification(false)}>
                    <Alert onClose={() => this.handleJobNotification(false)} severity="success">
                        Job submission successful
                    </Alert>
                </Snackbar>
            </div>
        );
    }
};

export default withStyles(styles)(withFirebase(Jobs));
