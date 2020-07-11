import React, {useState} from 'react';
import {UsersToolbar, UsersTable} from './components';
import mockData from './data';
import withStyles from "@material-ui/core/styles/withStyles";

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
        users: mockData,
    }

    render() {
        const {classes} = this.props;
        const {
            users,
        } = this.state;
        return (
            <div className={classes.root}>
                <UsersToolbar/>
                <div className={classes.content}>
                    <UsersTable users={users}/>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(Jobs);
