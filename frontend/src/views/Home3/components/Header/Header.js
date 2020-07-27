import React, {Component} from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from "@material-ui/core/Link";


export default class Header extends Component {

    render() {
        const {handleSignInOpen, handleSignOut, handleDBClick, firebase, user} = this.props;

        return (
            <AppBar position="static" color="secondary" elevation={0}>
                <Toolbar>
                    <Grid justify="space-between" alignItems="center" container>
                        <Grid item>
                            <Typography variant="h6" color="inherit" noWrap>
                                Openlane Cloud
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ?
                                <Grid justify="space-between" alignItems="center" container spacing={3}>
                                    <Grid item>
                                        <Button color="primary" onClick={() => handleDBClick()}>
                                            <ExitToAppIcon/> Dashboard
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color="primary"
                                                onClick={() => handleSignOut(firebase)}>
                                            Sign out
                                        </Button>
                                    </Grid>
                                </Grid> :
                                <Button variant='outlined' color="primary" onClick={() => handleSignInOpen()}>
                                    Login
                                </Button>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>);
    }
}
