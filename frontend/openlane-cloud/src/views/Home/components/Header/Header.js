import React, {Component} from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default class Header extends Component {

    render() {
        const {handleSignInOpen,handleSignOut, handleDBClick, firebase, user} = this.props;

        return (
            <AppBar color="secondary" position="static">
                <Toolbar>
                    <Grid justify="space-between" alignItems="center" container>
                        <Grid item><Typography color="primary">OpenLANE Cloud</Typography></Grid>
                        <Grid item>
                            {user ?
                                <Grid justify="space-between" alignItems="center" container spacing={3}>
                                    <Grid item>

                                        <Button color="primary" onClick={() => handleDBClick()}>
                                            <ExitToAppIcon /> Dashboard
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" onClick={() => handleSignOut(firebase)}>
                                            Sign out
                                        </Button>
                                    </Grid>
                                </Grid>:
                                <Button color="primary" onClick={() => handleSignInOpen()}>
                                    Login
                                </Button>}
                    </Grid>
                </Grid>
            </Toolbar>
    </AppBar>);
    }
    }
