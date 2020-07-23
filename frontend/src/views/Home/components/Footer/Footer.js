import React, {Component} from 'react'
import {Container, Grid, Link, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    footer: {
        borderTop: `4px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
});

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    footers = [
        {
            title: 'Company',
            description: ['Team', 'History', 'Contact us', 'Locations'],
        },
        {
            title: 'Features',
            description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
        },
        {
            title: 'Resources',
            description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
        },
        {
            title: 'Legal',
            description: ['Privacy policy', 'Terms of use'],
        },
    ];

    render() {
        const {classes} = this.props;

        return (
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justify="space-evenly">
                    {this.footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="body2" color="textPrimary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="#">
                        Openlane Cloud
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        );
    }

}

export default withStyles(styles)(Footer);