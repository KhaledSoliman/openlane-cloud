/**
 * Add New User Form
 */
import React, {Component} from 'react';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class SubmitDesignForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0,
    };

    handleChange = (e, newVal) => {
        this.setState({value: newVal});
    };

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `styled-tabpanel-${index}`,
        };
    };

    render() {
        const {submitDesignDetails, onChangeSubmitDesignDetails} = this.props;
        const {value} = this.state;
        return (
            <TabContext value={value}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={(e, newVal) => this.handleChange(e, newVal)}
                    centered
                >
                    <Tab label="Normal" {...this.a11yProps(0)}/>
                    <Tab label="Exploratory" {...this.a11yProps(1)}/>
                </Tabs>

                <TabPanel value={0}>
                    <Grid container>
                        <Form>
                            <FormGroup>
                                <TextField
                                    margin="normal"
                                    color="primary"
                                    name="designName"
                                    label="Design Name"
                                    type="text"
                                    id="designName"
                                    autoComplete="designName"
                                    value={submitDesignDetails.designName}
                                    onChange={e => onChangeSubmitDesignDetails('designName', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    margin="normal"
                                    color="primary"
                                    name="repoURL"
                                    label="Repo URL"
                                    helperText="Repo must be publicly accessible"
                                    type="text"
                                    id="repoURL"
                                    autoComplete="repoURL"
                                    value={submitDesignDetails.repoURL}
                                    onChange={e => onChangeSubmitDesignDetails('repoURL', e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                    </Grid>
                </TabPanel>
                <TabPanel value={1}>
                    <Grid container>
                        <Form>
                            <FormGroup>
                                <TextField
                                    margin="normal"
                                    color="primary"
                                    name="designName"
                                    label="Design Name"
                                    type="text"
                                    id="designName"
                                    autoComplete="designName"
                                    value={submitDesignDetails.designName}
                                    onChange={e => onChangeSubmitDesignDetails('designName', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    margin="normal"
                                    color="primary"
                                    name="repoURL"
                                    label="Repo URL"
                                    helperText="Repo must be publicly accessible"
                                    type="text"
                                    id="repoURL"
                                    autoComplete="repoURL"
                                    value={submitDesignDetails.repoURL}
                                    onChange={e => onChangeSubmitDesignDetails('repoURL', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    margin="normal"
                                    color="primary"
                                    name="regressionScript"
                                    label="Regression Script"
                                    type="text"
                                    id="regressionScript"
                                    multiline
                                    rows={8}
                                    rowsMax={20}
                                    value={submitDesignDetails.regressionScript}
                                    onChange={e => onChangeSubmitDesignDetails('regressionScript', e.target.value)}
                                />
                                <p><a href="https://github.com/efabless/openlane/blob/master/regression_results/README.md">More information about regression scripts</a></p>
                            </FormGroup>
                        </Form>
                    </Grid>
                </TabPanel>
            </TabContext>
        );
    }
}

export default SubmitDesignForm;
