/**
 * User Management Page
 */
import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router-dom';

// api
import api from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// add new user form
import SubmitDesignForm from './SubmitDesignForm';

// update user form
import UpdateUserForm from './UpdateUserForm';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import JobConsole from "../job-monitoring";
import GetAppIcon from '@material-ui/icons/GetApp';
import StopIcon from '@material-ui/icons/Stop';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import PopupState, {bindToggle, bindPopper} from 'material-ui-popup-state';
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {getSinceTime} from "Helpers/helpers";
import {badgeDict} from "Constants/jobConstants";
import EnhancedTable from "../../../components/EnhancedTable/EnhancedTable";

const jobFields = [
    {id: 'jobId', numeric: false, disablePadding: true, label: 'Job Id'},
    {id: 'designName', numeric: false, disablePadding: false, label: 'Design Name'},
    {
        id: 'type', numeric: false, disablePadding: false, label: 'Type', jsx: (row) => {
            return (<span
                className={`badge ${badgeDict[row.type]} badge-pill`}>{row.type}</span>);
        }
    },
    {
        id: 'status', numeric: false, disablePadding: false, label: 'Status', jsx: (row) => {
            return (
                <div className="d-flex justify-content-start">
                    <span
                        className={`badge badge-xs ${badgeDict[row.status]} mr-10 mt-10 position-relative`}>&nbsp;</span>
                    <div className="status">
                        <span className="d-block">{row.status}</span>
                        <span
                            className="small">{getSinceTime(row.updatedAt)}</span>
                    </div>
                </div>);
        }
    },
    {id: 'repoURL', numeric: false, disablePadding: false, label: 'Repo URL', link: true},
    {id: 'createdAt', numeric: false, disablePadding: false, label: 'Submission Time', timestamp: true},
    {id: 'completedAt', numeric: false, disablePadding: false, label: 'Completion Time', timestamp: true},
    {
        id: 'overflow', numeric: false, disablePadding: false, label: '', jsx: (row, props) => {
            return (<PopupState variant="popper" popupId={`moreMenu-${row.id}`}>
                {(popupState) => (
                    <div>
                        <IconButton
                            {...bindToggle(popupState)}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Popper {...bindPopper(popupState)} role={undefined}
                                transition>
                            {({TransitionProps}) => (
                                <Grow {...TransitionProps}
                                      style={{transformOrigin: 'center top'}}>
                                    <Paper>
                                        <ClickAwayListener
                                            onClickAway={popupState.close}>
                                            <MenuList autoFocusItem={open}
                                                      id="menu-list-grow">
                                                <MenuItem
                                                    component={Link}
                                                    to={`${props.match.url}/${row.jobId}`}
                                                    onClick={() => {
                                                        popupState.close();
                                                    }}>
                                                    <ListItemIcon>
                                                        <VisibilityIcon
                                                            fontSize="small"/>
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="caption"
                                                        noWrap>
                                                        View Details
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={row.status === 'completed' || row.status === 'stopped' || row.status === 'stopping' || row.status === 'failed'}
                                                    onClick={() => {
                                                        props.onStop(row);
                                                        popupState.close();
                                                    }}>
                                                    <ListItemIcon>
                                                        <StopIcon
                                                            fontSize="small"/>
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="caption"
                                                        noWrap>
                                                        Stop
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={row.status !== 'completed'}
                                                    onClick={() => {
                                                        props.downloadJobResult(row.jobId);
                                                        popupState.close();
                                                    }}>
                                                    <ListItemIcon>
                                                        <GetAppIcon
                                                            fontSize="small"/>
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="caption"
                                                        noWrap>
                                                        Download
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={row.status !== 'completed' && row.status !== 'stopped'}
                                                    onClick={() => {
                                                        props.onDelete(row.jobId);
                                                        popupState.close();
                                                    }}>
                                                    <ListItemIcon>
                                                        <DeleteIcon
                                                            fontSize="small"/>
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="caption"
                                                        noWrap>
                                                        Delete
                                                    </Typography>
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                )}
            </PopupState>);
        }
    },
];

class JobManagement extends Component {

    state = {
        all: false,
        rows: [],
        selected: [],
        order: '',
        orderBy: '',
        page: 0,
        rowsPerPage: 10,
        selectedJob: null,
        loading: false,
        processing: false,
        submitADesign: false,
        submitDesignDetails: {
            id: '',
            jobId: '',
            designName: '',
            repoURL: '',
            type: 'normal',
            status: '',
            regressionScript: {
                GLB_RT_ADJUSTMENT: '',
                FP_CORE_UTIL: '',
                PL_TARGET_DENSITY: '',
                SYNTH_STRATEGY: '',
                FP_PDN_VPITCH: '',
                FP_PDN_HPITCH: '',
                FP_ASPECT_RATIO: '',
                SYNTH_MAX_FANOUT: '',
                extra: '',
            },
            checked: false
        },
        openJobViewDialog: false,
        viewJob: null,
        editJob: null,
        allSelected: false,
        selectedJobs: 0,
        snackBarOpen: false,
        snackBarMessage: ''
    };

    componentDidMount() {
        this.getJobs(true);
    }


    getJobs = (loading = false) => {
        const {user} = this.props;
        this.setState({loading: loading}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getJobs().then((res) => {
                    this.setState({rows: res.data.rows});
                    this.setState({loading: false});
                });
            }).catch((err) => {
                this.setState({loading: false});
                console.log(err);
            });
        });
    };

    postJob() {
        const {user} = this.props;
        this.setState({processing: true}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                const {submitDesignDetails} = this.state;
                api.postJob(submitDesignDetails.designName, submitDesignDetails.repoURL, submitDesignDetails.type, submitDesignDetails.regressionScript).then((res) => {
                    console.log(res);
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Job submitted successfully',
                        processing: false
                    });
                });
            }).catch((err) => {
                this.setState({processing: false});
                console.log(err);
            });
        });
        this.getJobs();
    }

    downloadJobResult = (jobId) => {
        const {user} = this.props;
        this.setState({processing: true}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.downloadJobResult(jobId).then((res) => {
                    console.log(res);
                    this.setState({processing: false});
                });
            }).catch((err) => {
                this.setState({processing: false});
                console.log(err);
            });
        });
    };

    /**
     * On Stop
     */
    onStop = (data) => {
        this.refs.deleteConfirmationDialog.open();
        this.setState({selectedJob: data});
    };

    onDelete = (jobId) => {
        const {user} = this.props;
        this.setState({processing: true}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.deleteJob(jobId).then((res) => {
                    console.log(res);
                    this.setState({processing: false});
                });
            }).catch((err) => {
                this.setState({processing: false});
                console.log(err);
            });
        });
    };

    /**
     * Delete User Permanently
     */
    deleteUserPermanently() {
        const {user} = this.props;
        const {selectedJob} = this.state;
        this.setState({processing: true}, () => {
            this.refs.deleteConfirmationDialog.close();
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.quitJob(selectedJob.jobId).then((res) => {
                    console.log(res);
                    this.setState({
                        snackBarOpen: true,
                        snackBarMessage: 'Job stopped successfully',
                        processing: false,
                        selectedJob: null
                    });
                    this.getJobs();
                });
            }).catch((err) => {
                this.setState({processing: false});
                console.log(err);
            });
        });
        // let users = this.state.jobs;
        // let indexOfDeleteUser = users.indexOf(selectedJob);
        // users.splice(indexOfDeleteUser, 1);
        // this.setState({loading: true});
        // let self = this;
        // setTimeout(() => {
        //     self.setState({loading: false, users, selectedJob: null});
        // }, 2000);
    }

    /**
     * Open Submit Design Modal
     */
    opnSubmitADesign() {
        this.setState({submitADesign: true});
    }

    /**
     * On Reload
     */
    onReload() {
        this.getJobs(true);
    }

    /**
     * On Change Add Design Details
     */
    onChangeSubmitDesignDetails = (key, value, regression) => {
        if (regression)
            this.setState({
                submitDesignDetails: {
                    ...this.state.submitDesignDetails,
                    regressionScript: {
                        ...this.state.submitDesignDetails.regressionScript,
                        [key]: value
                    }
                }
            });
        else
            this.setState({
                submitDesignDetails: {
                    ...this.state.submitDesignDetails,
                    [key]: value
                }
            });
    };

    /**
     * Add New Design
     */
    addNewDesign() {
        const {designName, repoURL} = this.state.submitDesignDetails;
        if (designName !== '' && repoURL !== '') {
            this.setState({submitADesign: false}, () => {
                this.postJob(designName, repoURL);
            });
        }
    }

    /**
     * On Edit User
     */
    onEditUser(user) {
        this.setState({submitADesign: true, editJob: user});
    }

    /**
     * On Add & Update User Modal Close
     */
    onAddUpdateUserModalClose() {
        this.setState({submitADesign: false, editJob: null})
    }

    /**
     * On Update User Details
     */
    onUpdateUserDetails(key, value) {
        this.setState({
            editJob: {
                ...this.state.editJob,
                [key]: value
            }
        });
    }

    openJobViewDialog = (job) => {
        this.setState({selectedJob: job, openJobViewDialog: true});
    };

    /**
     * Update User
     */
    updateUser() {
        const {editJob} = this.state;
        let indexOfUpdateUser = '';
        let users = this.state.rows;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === editJob.id) {
                indexOfUpdateUser = i
            }
        }
        users[indexOfUpdateUser] = editJob;
        this.setState({loading: true, editJob: null, submitADesign: false});
        let self = this;
        setTimeout(() => {
            self.setState({users, loading: false});
            NotificationManager.success('User Updated!');
        }, 2000);
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackBarOpen: false});
    };

    render() {
        const {
            rows, processing, loading, selectedJob, editJob, snackBarOpen, snackBarMessage
        } = this.state;

        return (
            <div className="user-management">
                <Helmet>
                    <title>Openlane | Job Management</title>
                    <meta name="description" content="Job Management"/>
                </Helmet>
                <PageTitleBar
                    title={<IntlMessages id="sidebar.jobManagement"/>}
                    match={this.props.match}
                />
                <RctCollapsibleCard fullBlock>
                    {processing &&
                    <LinearProgress/>
                    }
                    {loading ?
                        <RctSectionLoader/> :
                        <EnhancedTable pagination sorting checkBoxes autoUpdate
                                       tableTitle="My Designs"
                                       fields={jobFields}
                                       rows={rows}
                                       getRows={this.getJobs}
                                       downloadJobResult={this.downloadJobResult}
                                       openJobViewDialog={this.openJobViewDialog}
                                       onDelete={this.onDelete}
                                       onStop={this.onStop}
                                       toolbarTopOptions={
                                           <Button onClick={() => this.opnSubmitADesign()} color="primary"
                                                   startIcon={<AddIcon/>}>
                                               Submit Design
                                           </Button>}
                                       bulkOptions={
                                           <Tooltip title="Delete">
                                               <IconButton aria-label="delete">
                                                   <DeleteIcon/>
                                               </IconButton>
                                           </Tooltip>}
                        />
                    }
                </RctCollapsibleCard>
                <DeleteConfirmationDialog
                    ref="deleteConfirmationDialog"
                    title="Are you sure?"
                    message="This will stop the job permanently."
                    onConfirm={() => this.deleteUserPermanently()}
                />
                <Modal isOpen={this.state.submitADesign} toggle={() => this.onAddUpdateUserModalClose()}>
                    <ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
                        {editJob === null ?
                            'Submit Design' : 'Update Job'
                        }
                    </ModalHeader>
                    <ModalBody>
                        {editJob === null ?
                            <SubmitDesignForm
                                submitDesignDetails={this.state.submitDesignDetails}
                                onChangeSubmitDesignDetails={this.onChangeSubmitDesignDetails}
                            />
                            :
                            <UpdateUserForm user={editJob} onUpdateUserDetail={this.onUpdateUserDetails.bind(this)}/>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {editJob === null ?
                            <Button variant="contained" className="text-white btn-success"
                                    onClick={() => this.addNewDesign()}>Submit</Button>
                            : <Button variant="contained" color="primary" className="text-white"
                                      onClick={() => this.updateUser()}>Update</Button>
                        }
                        {' '}
                        <Button variant="raised" className="text-white btn-danger"
                                onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={snackBarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackBar}
                    message={snackBarMessage}
                    action={[
                        <React.Fragment>
                            <IconButton key="close" aria-label="Close" color="inherit"
                                        onClick={this.handleCloseSnackBar}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps, {})(JobManagement);