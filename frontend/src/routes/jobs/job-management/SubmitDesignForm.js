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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class SubmitDesignForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0,
    };

    handleChange = (e, newVal) => {
        const designTypes = ['normal', 'exploratory'];
        this.props.submitDesignDetails.type = designTypes[newVal];
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
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
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
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
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
                            <InputLabel id="pdk-variant-label-select">PDK Variant</InputLabel>
                            <FormControl>
                            <Select
                                value={""}
                                displayEmpty
                                inputProps={{ 'aria-label': 'pdk-variant-label-select' }}
                            >
                                <MenuItem value="">
                                    <em>sky130_fd_sc_hd</em>
                                </MenuItem>
                                <MenuItem value={10}>sky130_fd_sc_hs</MenuItem>
                                <MenuItem value={20}>sky130_fd_sc_ms</MenuItem>
                                <MenuItem value={30}>sky130_fd_sc_ls</MenuItem>
                                <MenuItem value={30}>sky130_fd_sc_hdll</MenuItem>
                            </Select>
                            </FormControl>
                        </Form>
                    </Grid>
                </TabPanel>
                <TabPanel value={1}>
                    <Grid container>
                        <Form>
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
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
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
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
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="GLB_RT_ADJUSTMENT"
                                label="GLB_RT_ADJUSTMENT"
                                type="text"
                                id="GLB_RT_ADJUSTMENT"
                                value={submitDesignDetails.regressionScript.GLB_RT_ADJUSTMENT}
                                onChange={e => onChangeSubmitDesignDetails('GLB_RT_ADJUSTMENT', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="FP_CORE_UTIL"
                                label="FP_CORE_UTIL"
                                type="text"
                                id="FP_CORE_UTIL"
                                value={submitDesignDetails.regressionScript.FP_CORE_UTIL}
                                onChange={e => onChangeSubmitDesignDetails('FP_CORE_UTIL', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="PL_TARGET_DENSITY"
                                label="PL_TARGET_DENSITY"
                                type="text"
                                id="PL_TARGET_DENSITY"
                                value={submitDesignDetails.regressionScript.PL_TARGET_DENSITY}
                                onChange={e => onChangeSubmitDesignDetails('PL_TARGET_DENSITY', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="SYNTH_STRATEGY"
                                label="SYNTH_STRATEGY"
                                type="text"
                                id="SYNTH_STRATEGY"
                                value={submitDesignDetails.regressionScript.SYNTH_STRATEGY}
                                onChange={e => onChangeSubmitDesignDetails('SYNTH_STRATEGY', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="FP_PDN_VPITCH"
                                label="FP_PDN_VPITCH"
                                type="text"
                                id="FP_PDN_VPITCH"
                                value={submitDesignDetails.regressionScript.FP_PDN_VPITCH}
                                onChange={e => onChangeSubmitDesignDetails('FP_PDN_VPITCH', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="FP_PDN_HPITCH"
                                label="FP_PDN_HPITCH"
                                type="text"
                                id="FP_PDN_HPITCH"
                                value={submitDesignDetails.regressionScript.FP_PDN_HPITCH}
                                onChange={e => onChangeSubmitDesignDetails('FP_PDN_HPITCH', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="FP_ASPECT_RATIO"
                                label="FP_ASPECT_RATIO"
                                type="text"
                                id="FP_ASPECT_RATIO"
                                value={submitDesignDetails.regressionScript.FP_ASPECT_RATIO}
                                onChange={e => onChangeSubmitDesignDetails('FP_ASPECT_RATIO', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                color="primary"
                                name="SYNTH_MAX_FANOUT"
                                label="SYNTH_MAX_FANOUT"
                                type="text"
                                id="SYNTH_MAX_FANOUT"
                                value={submitDesignDetails.regressionScript.SYNTH_MAX_FANOUT}
                                onChange={e => onChangeSubmitDesignDetails('SYNTH_MAX_FANOUT', e.target.value, true)}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                margin="normal"
                                color="primary"
                                name="extra"
                                label="Extra"
                                type="text"
                                id="extra"
                                multiline
                                rows={6}
                                rowsMax={20}
                                value={submitDesignDetails.regressionScript.extra}
                                onChange={e => onChangeSubmitDesignDetails('extra', e.target.value, true)}
                            />
                            <p><a href="https://github.com/efabless/openlane/blob/master/regression_results/README.md">More
                                information about regression scripts</a></p>
                        </Form>
                    </Grid>
                </TabPanel>
            </TabContext>
        );
    }
}

export default SubmitDesignForm;
