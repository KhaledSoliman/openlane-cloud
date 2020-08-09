import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {LazyLog, ScrollFollow} from 'react-lazylog';
import {hostname, port} from "../../api/config";

const styles = theme => ({
});

const url = `ws://${hostname}:8080`;

class JobConsole extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {};


    render() {
        const {classes} = this.props;
        const {} = this.state;
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
