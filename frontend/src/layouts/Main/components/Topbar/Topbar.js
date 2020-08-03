import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Toolbar, Badge, Hidden, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import withStyles from "@material-ui/core/styles/withStyles";
import {withFirebase} from "../../../../services/firebase";
import FirebaseContext from "../../../../services/firebase/context";

const styles = theme => ({
    root: {
        boxShadow: '0px 2px 10px 0px rgba(50, 50, 50, 0.50)',
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
});

class Topbar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSignOut = (firebase) => {
        firebase.doSignOut().then(() => {
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        const {onNotificationsOpen, onSidebarOpen, classes} = this.props;
        return (
            <AppBar className={classes.root} color="secondary">
                <Toolbar>
                    <RouterLink to="/">
                        <Typography color="primary">OpenLANE Cloud</Typography>
                    </RouterLink>
                    <div className={classes.flexGrow}/>
                    <IconButton
                        color="primary"
                        onClick={onNotificationsOpen}
                    >
                        <Badge
                            badgeContent={3}
                            color="error"
                            variant="dot"
                        >
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <RouterLink to="/">
                        <FirebaseContext.Consumer>
                            {firebase => {
                                return <IconButton
                                    className={classes.signOutButton}
                                    color="primary"
                                    onClick={() => this.handleSignOut(firebase)}
                                >
                                    <ExitToAppIcon/>
                                </IconButton>
                            }}
                        </FirebaseContext.Consumer>
                    </RouterLink>
                    <Hidden lgUp>
                        <IconButton
                            color="primary"
                            onClick={onSidebarOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(withFirebase(Topbar));
