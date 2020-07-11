import React, { useState } from 'react';
import {AppBar, Toolbar, Button, Grid, Container, TextField, Box, Tooltip, Typography} from '@material-ui/core'
import { SignIn } from './components';
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    height: "auto",
    backgroundColor: theme.palette.grey[100]
  },
  card: {
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: 'none'
  },

  typography: {
    marginTop: 25,
  },

  button: {
    minHeight: 50,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    },
  },
}));




const Home = (props) => {
  const classes = useStyles();
  const [ signInOpen, handleSignIn ] = useState(false);
  const [ firstName, handleFName ] = useState('');
  const [ lastName, handleLName ] = useState('');
  const [ email, handleEmail ] = useState('');
  const [ passwordOne, handlePWOne ] = useState('');
  const [ passwordTwo, handlePWTwo ] = useState('');
  const [ error, handleError ] = useState(null);


    return (
      <div className={classes.root} {...props}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Grid justify="space-between" alignItems="center" container>
              <Grid item><Typography variant="logo">OpenLANE Cloud</Typography></Grid>
              <Grid item>
                <Button color="primary" onClick={() => handleSignIn(true)}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl">
          <div className="row">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
              <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                <Grid item xs={6}>
                  <Container>
                    <Typography variant="h1">Open Source Design Automation</Typography>

                    <Typography variant="body1" className={classes.typography}>
                      Automate your design flow using OpenLANE Cloud. The open-source solution
                      that will
                      allow you to deploy, monitor, and modify your OpenLANE designs.
                    </Typography>
                  </Container>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                        <Grid item xs={10}>
                          <Typography variant="h3">Get Started!</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            autoComplete="fname"
                            name="fname"
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                            id="fname"
                            label="First Name"
                            value={firstName}
                            onChange={e => handleFName(firstName)}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lname"
                            label="Last Name"
                            name="lname"
                            autoComplete="lname"
                            value={lastName}
                            onChange={e => handleLName(lastName)}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            variant="outlined"
                            required
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => handleEmail(email)}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Tooltip title="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter." arrow>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={passwordOne}
                              onChange={e => handlePWOne(passwordOne)}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            value={passwordTwo}
                            onChange={e => handlePWTwo(passwordTwo)}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Box mt={4}>
                            <Button className={classes.button} variant="contained" fullWidth color="primary">
                              Sign Up Now!
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Container>
        <Modal
          open={signInOpen}
          onClose={() => handleSignIn(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <SignIn/>
        </Modal>
      </div>
    );
}

export default Home;
