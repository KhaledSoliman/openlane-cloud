import React, {useState} from 'react';
import {JobsToolbar, JobsTable, JobSubmission} from './components';
import mockData from './data';
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";

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
        const self = this;
    }

    state = {
        addJobOpen: false,
        users: mockData,
    }

    handleAddJobOpen = () => {
        this.setState({
            addJobOpen: true
        })
    }

    handleAddJobClose = () => {
        this.setState({
            addJobOpen: false
        })
    }

    render() {
        const {classes} = this.props;
        const {
            addJobOpen,
            users,
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
                        <JobSubmission/>
                    </>
                </Modal>
            </div>
        );
    }
};

export default withStyles(styles)(Jobs);
