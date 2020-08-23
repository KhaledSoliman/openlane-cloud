import React, {Component} from 'react';
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import api from 'Api';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

class JobDetails extends Component {
    state = {
        job: null,
        loading: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {jobId} = this.props.match.params;
        this.getJob(jobId, true);
        console.log(this.state.job)
    }

    getJob(jobId, loading = false) {
        const {user} = this.props;
        this.setState({loading: loading}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getJob(jobId).then((res) => {
                    this.setState({job: res.data});
                    this.setState({loading: false});
                });
            }).catch((err) => {
                this.setState({loading: false});
                console.log(err);
            });
        });
    }

    onReload() {

    }

    render() {
        const {jobId} = this.props.match.params;
        const {match} = this.props;
        return (
            <div className="blank-wrapper">

                <Helmet>
                    <title>Openlane | Job Details</title>
                    <meta name="description" content="Job Details"/>
                </Helmet>
                <PageTitleBar
                    title={<IntlMessages id="sidebar.jobDetails"/>}
                    match={match}
                />
                <RctCollapsibleCard fullBlock>
                    <Toolbar>
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-between">
                                <Typography variant="h6" id="tableTitle" component="div">
                                    Job #{jobId}
                                </Typography>
                                <div>
                                    <Tooltip title="Reload Job Data">
                                        <IconButton onClick={() => this.onReload()}>
                                            <AutorenewIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    {/*<Button onClick={} color="primary"><AddIcon/> Submit*/}
                                    {/*    Design</Button>*/}
                                </div>
                            </div>
                            <Divider variant="middle"/>
                            <div className="row align-items-center justify-content-between">
                                <Typography color="inherit" variant="subtitle1" component="div">
                                     selected
                                </Typography>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </Toolbar>
                    <TableContainer component={Paper}>
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                        Details
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell align="right">{1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`1 %`}</TableCell>
                                    <TableCell align="right">1</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell align="right">1</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </RctCollapsibleCard>
            </div>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps, {})(JobDetails);