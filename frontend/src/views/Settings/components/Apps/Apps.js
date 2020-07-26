import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FirebaseContext, {withFirebase} from "../../../../services/firebase/context";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField, Tooltip
} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {},
    card: {
        width: 600,
    },
});

class Apps extends React.Component {
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
            <Card className={classes.card}>
                    <CardHeader
                        title="Third Party Apps"
                    />
                    <Divider/>
                    <CardContent>
                        hi
                    </CardContent>
            </Card>
        );
    }
};

Apps.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Apps);
