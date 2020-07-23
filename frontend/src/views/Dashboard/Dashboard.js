import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    LatestSales,
    UsersByDevice,
    LatestProducts,
    LatestOrders
} from './components';
import {withFirebase} from "../../services/firebase";

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    }
});

class Dashboard extends Component  {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Budget/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalUsers/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TasksProgress/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalProfit/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <LatestSales/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <UsersByDevice/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <LatestProducts/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <LatestOrders/>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default withStyles(styles)(withFirebase(Dashboard));
