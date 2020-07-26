import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {AppBar, Toolbar, Badge, Hidden, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: '0px 2px 10px 0px rgba(50, 50, 50, 0.50)',
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}));

const Topbar = props => {
    const {className, onSidebarOpen, onNotificationsOpen, ...rest} = props;

    const classes = useStyles();

    const [notifications] = useState([]);

    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
            color="secondary"
        >
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
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <RouterLink to="/">
                        <IconButton
                            className={classes.signOutButton}
                            color="primary"
                        >
                            <ExitToAppIcon/>
                        </IconButton>
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
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;
