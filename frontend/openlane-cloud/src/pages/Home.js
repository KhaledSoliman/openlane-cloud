import React from 'react';
import {AppBar, Toolbar, Button, Grid, makeStyles, Container, TextField, Box} from '@material-ui/core'
import SignIn from '../components/SignInModal';
import Modal from "@material-ui/core/Modal";
import Copyright from "../components/Copyright";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#1a1a1a",

        height: "100vh"
    }
}));

function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SignInModalBody = (<SignIn/>);

    return (
        <div className={classes.root}>
            <AppBar color="default" position="static">
                <Toolbar>
                    <Grid justify="space-between" alignItems="center" container spacing={24}>
                        <Grid item>OpenLANE Cloud</Grid>
                        <Grid item>
                            <Button color="primary" onClick={handleOpen}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={3}>
                        <Container>
                            <h1 className="text-white">Open Source Design Automation</h1>
                            <p className="text-white">
                                Automate your design flow using OpenLANE Cloud. The open-source solution that will allow you to deploy, monitor, and modify your OpenLANE designs.
                            </p>
                        </Container>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>
                            <h4>Username</h4>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <h4>Email</h4>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <h4>Password</h4>
                            <TextField id="outlined-search" variant="outlined" fullWidth size="small"/>
                            <p style={{fontSize: "12px", marginTop: "15px"}}>Make sure it's at least 15 characters OR at
                                least 8 characters including a number and a lowercase letter.</p>
                            <Box mt={4}>
                                <Button variant="contained" fullWidth color="primary">
                                    Sign Up Now!
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {SignInModalBody}
            </Modal>
        </div>
    );
}

export default Home;