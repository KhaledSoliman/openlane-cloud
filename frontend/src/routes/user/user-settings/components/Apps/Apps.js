import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from '@material-ui/core';
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import GitHubIcon from '@material-ui/icons/GitHub';

class Apps extends Component {
    state = {
        githubOpen: false,
    };

    handleGithubClick = () => {
        const {githubOpen} = this.state;
        if (githubOpen)
            this.setState({githubOpen: false});
        else
            this.setState({githubOpen: true});
    };

    render() {
        const {githubOpen} = this.state;

        return (
            <Card>
                <CardHeader title="Third Party Apps"/>
                <Divider/>
                <CardContent>
                    <List>
                        <ListItem button onClick={() => this.handleGithubClick()}>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItem>
                            <   ListItemText primary="GitHub" secondary="Connected"/>
                            </ListItem>
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
}

export default Apps;
