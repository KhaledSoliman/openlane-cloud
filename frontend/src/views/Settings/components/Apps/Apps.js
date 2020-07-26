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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import GitHubIcon from '@material-ui/icons/GitHub';

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
        githubOpen: false,
    };

    handleGithubClick = () => {
        const {githubOpen} = this.state;
        if(githubOpen)
            this.setState({githubOpen: false});
        else
            this.setState({githubOpen: true});
    };

    render() {
        const {classes} = this.props;
        const {
            githubOpen
        } = this.state;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title="Third Party Apps"
                />
                <Divider/>
                <CardContent>
                    <List>
                        <ListItem button onClick={() => this.handleGithubClick()}>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItemText primary="GitHub" secondary="Connected"/>
                            {githubOpen ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={githubOpen} timeout="auto">
                            <List disablePadding>
                                <ListItem>
                                    <ListItemText primary="Starred"/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </CardContent>
            </Card>
        );
    }
};

Apps.propTypes = {
    className: PropTypes.string
};

export default withStyles(styles)(Apps);
