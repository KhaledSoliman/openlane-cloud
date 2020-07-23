import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    paper: {
        color: 'black',
    }
});

class JobConsole extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    };


    render() {
        const {classes} = this.props;
        const {
        } = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0}>
                        hi
                </Paper>
            </div>
        );
    }
};

export default withStyles(styles)(JobConsole);
