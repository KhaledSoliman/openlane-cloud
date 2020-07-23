import React, {useState} from 'react';
import {JobsToolbar, JobsTable, JobSubmission} from './components';
import mockData from './data';
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {withFirebase} from "../../services/firebase";

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
        users: mockData,
        jobNotification: false,
        regToken: null
    };

    updateRegToken = (token) => {
        this.setState({regToken: token});
    };

    componentDidMount() {
        // const messaging = this.props.firebase.messaging;
        // messaging.usePublicVapidKey("BKq0NFfehH_ddw1pUhZaeEKbvaE1izqr53Z_MHkPC1lefnGL9jbaB5eyOUPRTwI7npbx6V3vzmnfD6T7ZHc2QBk");
        // messaging.getToken().then((currentToken) => {
        //     if (currentToken) {
        //         this.updateRegToken(currentToken);
        //     } else {
        //         // Show permission request.
        //         console.log('No Instance ID token available. Request permission to generate one.');
        //     }
        // }).catch((err) => {
        //     console.log('An error occurred while retrieving token. ', err);
        // });
        //
        // messaging.onTokenRefresh(() => {
        //     messaging.getToken().then((refreshedToken) => {
        //         console.log('Token refreshed.');
        //         this.updateRegToken(refreshedToken);
        //     }).catch((err) => {
        //         console.log('Unable to retrieve refreshed token ', err);
        //     });
        // });
        // messaging.onMessage((payload) => {
        //     console.log('Message received. ', payload);
        // });
    }

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

    render() {
        const {classes} = this.props;
        const {
            addJobOpen,
            users,
            jobNotification
        } = this.state;
        return (
            <div className={classes.root}>
                <JobsToolbar handleAddJobOpen={this.handleAddJobOpen}/>
                <div className={classes.content}>
                    <JobsTable users={users}/>
                </div>
                <Modal
                    open={addJobOpen}
                    onClose={() => this.handleAddJobClose()}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <>
                        <JobSubmission regToken={this.state.regToken} handleAddJobClose={this.handleAddJobClose}
                                       handleJobNotification={this.handleJobNotification}/>
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
