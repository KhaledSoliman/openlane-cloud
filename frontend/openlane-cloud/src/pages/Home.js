import React from 'react';
import {AppBar, Toolbar, Button, Grid, makeStyles, Container, TextField, Box} from '@material-ui/core'
import SignIn from '../components/SignInModal';
import Modal from "@material-ui/core/Modal";
import Copyright from "../components/Copyright";
import Paper from "@material-ui/core/Paper";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Carousel from 'react-material-ui-carousel'

const styles = theme => ({
    root: {
        background: "#2d2d2d",
        height: "100vh"
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?tech)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:"200px"
    },
});


class Home extends React.Component {
    state = {
        signInOpen: false,
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };

    constructor(props) {
        super(props)
    }

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    handleSignInOpen() {
        this.setState({
            signInOpen: true
        })
    }

    handleSignInClose() {
        this.setState({
            signInOpen: false
        })
    }

    render() {
        const items = [
            {
                name: "Random Name #1",
                description: "Probably the most random thing you have ever seen!"
            },
            {
                name: "Random Name #2",
                description: "Hello World!"
            }
        ]

        const {classes} = this.props;
        const {signInOpen} = this.state;

        return (
            <div className={classes.root}>
                <AppBar color="default" position="static">
                    <Toolbar>
                        <Grid justify="space-between" alignItems="center" container spacing={24}>
                            <Grid item>OpenLANE Cloud</Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => this.handleSignInOpen()}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="100%">
                    <Carousel className="mt-5">
                        {
                            items.map(item => {
                                return (<Paper>
                                    <div className={classes.image}/>
                                </Paper>);
                            })
                        }
                    </Carousel>
                    <div className="row">
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                            <Grid container direction="row" justify="space-evenly" alignItems="center">
                                <Grid item xs={6}>
                                    <Container>
                                        <h1 className="text-white">Open Source Design Automation</h1>
                                        <p className="text-white">
                                            Automate your design flow using OpenLANE Cloud. The open-source solution
                                            that will
                                            allow you to deploy, monitor, and modify your OpenLANE designs.
                                        </p>
                                    </Container>
                                </Grid>
                                <Grid item xs={3}>
                                    <Card>
                                        <CardHeader title="Get started with openlane cloud">
                                        </CardHeader>
                                        <CardContent>
                                            <Grid container direction="row" justify="space-evenly" alignItems="center">
                                                <Grid item xs={10}>
                                                    <TextField
                                                        autoComplete="fname"
                                                        name="fname"
                                                        variant="filled"
                                                        required
                                                        fullWidth
                                                        id="fname"
                                                        label="First Name"
                                                        autoFocus
                                                        value={this.state.fname}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="filled"
                                                        required
                                                        fullWidth
                                                        id="lname"
                                                        label="Last Name"
                                                        name="lname"
                                                        autoComplete="lname"
                                                        value={this.state.lname}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="filled"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={this.state.email}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="filled"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="current-password"
                                                        helperText="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."
                                                        value={this.state.password}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        variant="filled"
                                                        required
                                                        fullWidth
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        type="password"
                                                        id="confirmPassword"
                                                        autoComplete="current-password"
                                                        value={this.state.confirmPassword}
                                                        onChange={e => this.updateInputVal(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Box mt={4}>
                                                        <Button variant="contained" fullWidth color="primary">
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
                <Box mt={8}>
                    <Copyright/>
                </Box>
                <Modal
                    open={signInOpen}
                    onClose={() => this.handleSignInClose()}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <SignIn/>
                </Modal>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);