import React, {Component} from 'react';
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';

import {getSinceTime} from "Helpers/helpers";
import {badgeDict} from "Constants/jobConstants";
import EnhancedTable from "../../../components/EnhancedTable/EnhancedTable";
import JobConsole from "../job-monitoring";

const runFields = [
    {id: 'id', numeric: false, disablePadding: false, label: 'Run Id'},
    {id: 'name', numeric: false, disablePadding: false, label: 'Run Name'},
    {
        id: 'status', numeric: false, disablePadding: false, label: 'Status', jsx: (row) => {
            return (<div className="d-flex justify-content-start">
                <span
                    className={`badge badge-xs ${badgeDict[row.status]} mr-10 mt-10 position-relative`}>&nbsp;</span>
                <div className="status">
                    <span className="d-block">{row.status}</span>
                    <span
                        className="small">{getSinceTime(row.updatedAt)}</span>
                </div>
            </div>)
        }
    },
    {id: 'createdAt', numeric: false, disablePadding: false, label: 'Start Time', timestamp: true},
    {id: 'completedAt', numeric: false, disablePadding: false, label: 'Completion Time', timestamp: true}
];

class JobDetails extends Component {
    state = {
        job: null,
        loadingJobDetails: false,
        loadingReport: false,
        report: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getJob(true);
    }

    getJob = (loading = false) => {
        const {jobId} = this.props.match.params;
        const {user} = this.props;
        this.setState({loadingJobDetails: loading}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getJob(jobId).then((res) => {
                    if(res.data.status === 'completed')
                        this.getReport(res.data.jobId);
                    this.setState({job: res.data, loadingJobDetails: false});
                });
            }).catch((err) => {
                this.setState({loadingJobDetails: false});
                console.log(err);
            });
        });
    };

    getReport(jobId) {
        const {user} = this.props;
        this.setState({loadingReport: false}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getReport(jobId).then((res) => {
                    this.setState({report: res.data, loadingReport: false});
                });
            }).catch((err) => {
                this.setState({loadingReport: false});
                console.log(err);
            });
        });
    }

    onReloadJobDetails() {
        const {jobId} = this.props.match.params;
        this.getJob(jobId, true);
    }

    onReloadReport() {
        const {jobId} = this.props.match.params;
        this.getReport(jobId);
    }

    render() {
        const {jobId} = this.props.match.params;
        const {match} = this.props;
        const {loadingReport, loadingJobDetails, job, report, runOrderBy} = this.state;
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
                <RctCollapsibleCard fullBlock collapsible={true}>
                    {loadingJobDetails || !job ?
                        <RctSectionLoader/> :
                        <div>
                            <Toolbar>
                                <div className="container-fluid">
                                    <div className="row align-items-center justify-content-between">
                                        <Typography variant="h5">
                                            Job details of job #{jobId}
                                        </Typography>
                                        <div>
                                            <Tooltip title="Reload Job Data">
                                                <IconButton onClick={() => this.onReloadJobDetails()}>
                                                    <AutorenewIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <Divider variant="middle"/>
                                </div>
                            </Toolbar>
                            <TableContainer component={Paper}>
                                <Table aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="subtitle1">
                                                    Details
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    className={job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed' ? '' : 'text-warning'}
                                                    size="small"
                                                    startIcon={<StopIcon/>}
                                                    disabled={job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed'}
                                                >
                                                    Stop
                                                </Button>
                                                <Button
                                                    size="small"
                                                    className={job.status !== 'completed' && job.status !== 'stopped' && job.status !== 'failed' ? '' : 'text-danger'}
                                                    startIcon={<DeleteIcon/>}
                                                    disabled={job.status !== 'completed' && job.status !== 'stopped' && job.status !== 'failed'}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Job ID</TableCell>
                                                            <TableCell align="right">{job.jobId}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Design Name</TableCell>
                                                            <TableCell align="right">{job.designName}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Type</TableCell>
                                                            <TableCell align="right"><span
                                                                className={`badge ${badgeDict[job.type]} badge-pill`}>{job.type}</span></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell align="right">
                                                                <div className="d-flex justify-content-end">
                                                    <span
                                                        className={`badge badge-xs ${badgeDict[job.status]} mr-10 mt-10 position-relative`}>&nbsp;</span>
                                                                    <div className="status">
                                                                        <span className="d-block">{job.status}</span>
                                                                        <span
                                                                            className="small">{getSinceTime(job.updatedAt)}</span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Repository URL</TableCell>
                                                            <TableCell align="right">{job.repoURL}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Submission Time</TableCell>
                                                            <TableCell
                                                                align="right">{new Date(job.createdAt).toLocaleString()}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Completion Time</TableCell>
                                                            <TableCell
                                                                align="right">{job.completedAt ? new Date(job.completedAt).toLocaleString() : 'N/A'}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                </RctCollapsibleCard>
                <RctCollapsibleCard fullBlock collapsible={true}>
                    {loadingJobDetails ?
                        <RctSectionLoader/> :
                        <TableContainer component={Paper}>
                            {job && job.runs && (job.runs.length >= 1 ?
                                    <EnhancedTable
                                        sorting
                                        pagination
                                        autoUpdate
                                        getRows={this.getJob}
                                        tableTitle="Runs"
                                        fields={runFields}
                                        rows={job.runs}
                                    /> :
                                    <Typography variant="h5">
                                        No runs available
                                    </Typography>

                            )}
                        </TableContainer>
                    }
                </RctCollapsibleCard>
                <RctCollapsibleCard fullBlock collapsible={true}>
                    <Toolbar>
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-between">
                                <Typography variant="h5">
                                    Monitoring
                                </Typography>
                            </div>
                            <Divider variant="middle"/>
                        </div>
                    </Toolbar>
                    {job ? job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed' ?
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center mb-5">
                                <Typography align="center" variant="caption">
                                    Job has already {job.status}
                                </Typography>
                            </div>
                        </div> :
                        <JobConsole job={job}/> : <RctSectionLoader/>}
                </RctCollapsibleCard>
                <RctCollapsibleCard fullBlock collapsible={true}>
                    <Toolbar>
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-between">
                                <Typography variant="h5">
                                    Reports
                                </Typography>
                                <div>
                                    <Tooltip title="Reload Job Data">
                                        <IconButton onClick={() => this.onReloadReport()}>
                                            <AutorenewIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <Divider variant="middle"/>
                        </div>
                    </Toolbar>
                    {loadingReport ?
                        <RctSectionLoader/> :
                        (report) ? (report.length === 1 ?
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            {Object.keys(report[0]).map((key, i) => {
                                                    if (key !== "")
                                                        return (
                                                            <TableRow key={i}>
                                                                <TableCell>{key}</TableCell>
                                                                <TableCell align="right">{report[0][key]}</TableCell>
                                                            </TableRow>
                                                        )
                                                }
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer> :
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {Object.keys(report[0]).map((key, i) => {
                                                        if (key !== "")
                                                            return (
                                                                <TableCell key={i}>{key}</TableCell>
                                                            )
                                                    }
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {report.map((value, i) => {
                                                    return (<TableRow>
                                                        {Object.keys(report[i]).map((key, index2) => {
                                                            if (key !== "")
                                                                return (
                                                                    <TableCell key={index2}>{report[i][key]}</TableCell>
                                                                )
                                                        })}
                                                    </TableRow>)
                                                }
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        ) : <div className="container-fluid">
                            <div className="row align-items-center justify-content-center mb-5">
                                <Typography align="center" variant="caption">
                                    No reports available
                                </Typography>
                            </div>
                        </div>
                    }
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