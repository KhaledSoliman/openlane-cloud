import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useMediaQuery} from '@material-ui/core';

import {Sidebar, Topbar, Footer, Notifications} from './components';
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%'
    }
}));

const Main = props => {
    const {children} = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);
    const [openNotifications, setOpenNot] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const handleNotificationsOpen = () => {
        setOpenNot(true);
    };

    const handleNotificationsClose = () => {
        setOpenNot(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop
            })}
        >
            <Topbar onSidebarOpen={handleSidebarOpen} onNotificationsOpen={handleNotificationsOpen}/>
            <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children}
                <Footer/>
            </main>
            <Modal
                open={openNotifications}
                onClose={handleNotificationsClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Notifications/>
            </Modal>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
