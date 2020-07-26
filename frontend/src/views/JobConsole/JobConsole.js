import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { LazyLog, ScrollFollow } from 'react-lazylog';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";

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
const url = 'ws://localhost:8080';
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
            <LazyLog
                url={url}
                enableSearch
                websocket
            />
        );
    }
};

export default withStyles(styles)(JobConsole);
