import React from 'react';
import {AppBar, Toolbar, Button, Grid, makeStyles, Container, TextField, Box} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: "rgb(230,230,230)",
        height: "100vh",
    },
}));

function Home(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="white">
                <Toolbar>
                    <Grid justify="space-between" alignItems="center" container spacing={24}>
                        <Grid item>OpenLANE Cloud</Grid>
                        <Grid item><Button style={{color: "rgb(210,30,53)"}}>LOGIN</Button></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="75vh">
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={3}>
                        <Container>
                            <h1>Open Source Flow Automation</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </Container>
                    </Grid>
                    <Grid item xs={3}>
                        <Box bgcolor="white" borderRadius={8} pt={2} pl={3} pr={3} pb={5}>
                            <h3>Username</h3>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <h3>Email</h3>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <h3>Password</h3>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <p style={{fontSize: "12px", marginTop: "15px"}}>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
                            <Box mt={4}>
                                <Button style={{minHeight: '45px', maxHeight: '45px', background: "rgb(210,30,53)"}} variant="contained" fullWidth color="primary">
                                    Sign Up Now!
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Home;