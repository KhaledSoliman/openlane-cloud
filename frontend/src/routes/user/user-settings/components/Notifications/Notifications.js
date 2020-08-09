import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from '@material-ui/core';

const Notifications = props => {
    const {...rest} = props;
    return (
        <Card>
            <form>
                <CardHeader
                    subheader="Manage your notifications"
                    title="Notifications Settings"
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={10}
                        wrap="wrap"
                    >
                        <Grid
                            item
                            xs
                        >
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                            >
                                Notifications
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        defaultChecked //
                                    />
                                }
                                label="Email"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        defaultChecked //
                                    />
                                }
                                label="Push Notifications"
                            />
                        </Grid>
                        <Grid
                            item
                            xs
                        >
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                            >
                                Newsletter
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        defaultChecked //
                                    />
                                }
                                label="Email"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Push Notifications"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button color="primary" variant="contained">
                        Save
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default Notifications;
