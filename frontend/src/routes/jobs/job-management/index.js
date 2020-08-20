/**
 * User Management Page
 */
import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
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

const jobFields = [
    {id: 'jobId', numeric: false, disablePadding: true, label: 'Job Id'},
    {id: 'designName', numeric: false, disablePadding: false, label: 'Design Name'},
    {id: 'type', numeric: false, disablePadding: false, label: 'Type'},
    {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
    {id: 'repoURL', numeric: false, disablePadding: false, label: 'Repo URL'},
    {id: 'createdAt', numeric: false, disablePadding: false, label: 'Submission Time'},
    {id: 'completedAt', numeric: false, disablePadding: false, label: 'Completion Time'},
    {id: 'overflow', numeric: false, disablePadding: false, label: ''},
];

const badgeDict = {
    'normal': 'badge-primary',
    'exploratory': 'badge-dark',
    'submitted': 'badge-secondary',
    'scheduled': 'badge-info',
    'running': 'badge-primary',
    'running-synthesis': 'badge-synthesis',
    'running-floorplan': 'badge-floorplan',
    'running-placement': 'badge-placement',
    'running-cts:': 'badge-cts',
    'running-routing': 'badge-routing',
    'running-lvs': 'badge-lvs',
    'running-magic': 'badge-magic',
    'archiving': 'badge-dark',
    'completed': 'badge-success',
    'failed': 'badge-danger',
    'stopping': 'badge-warning',
    'stopped': 'badge-warning'
};

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
        //poll
        setInterval(this.getJobs.bind(this), 5000);
    }


    getJobs(loading = false) {
        const {user} = this.props;
        this.setState({loading: loading}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getJobs().then((res) => {
                    this.setState({rows: res.data});
                    this.setState({loading: false});
                });
            }).catch((err) => {
                this.setState({loading: false});
                console.log(err);
            });
        });
    }

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

    downloadJobResult(jobId) {
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
    }

    /**
     * On Stop
     */
    onStop(data) {
        this.refs.deleteConfirmationDialog.open();
        this.setState({selectedJob: data});
    }

    onDelete(jobId) {
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
    }

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

    getSinceTime(time) {
        return `${moment(time).fromNow()}`;
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackBarOpen: false});
    };

    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = this.state.rows.map((n) => n.id);
            this.setState({
                selected: newSelecteds
            });
            return;
        }

        this.setState({
            selected: []
        });
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({
            selected: newSelected
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    render() {
        const {location} = this.props;
        const {
            rows, processing, loading, selectedJob, editJob, allSelected, selectedJobs, snackBarOpen, snackBarMessage,
            order, orderBy, page, rowsPerPage, selected
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
                    <Toolbar>
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-between">
                                <Typography variant="h6" id="tableTitle" component="div">
                                    My Designs
                                </Typography>
                                <div>
                                    <Tooltip title="Reload Job Data">
                                        <IconButton onClick={() => this.onReload()}>
                                            <AutorenewIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Button onClick={() => this.opnSubmitADesign()} color="primary"><AddIcon/> Submit
                                        Design</Button>
                                </div>
                            </div>
                            <Divider variant="middle"/>
                            {selected.length > 0 && (
                                <div className="row align-items-center justify-content-between">
                                    <Typography color="inherit" variant="subtitle1" component="div">
                                        {selected.length} selected
                                    </Typography>
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    </Toolbar>
                    <TableContainer>
                        <Table
                            stickyHeader
                            aria-labelledby="tableTitle"
                            size="small"
                            aria-label="enhanced table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selected.length > 0 && selected.length < rows.length}
                                            checked={rows.length > 0 && selected.length === rows.length}
                                            onChange={this.handleSelectAllClick}
                                            inputProps={{'aria-label': 'select all jobs'}}
                                        />
                                    </TableCell>
                                    {jobFields.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.numeric ? 'right' : 'left'}
                                            padding={headCell.disablePadding ? 'none' : 'default'}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={(e) => this.handleRequestSort(e, headCell.id)}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.stableSort(rows, this.getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = this.isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => this.handleClick(event, row.id)}
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.jobId}
                                                </TableCell>
                                                <TableCell>{row.designName}</TableCell>
                                                <TableCell><span
                                                    className={`badge ${badgeDict[row.type]} badge-pill`}>{row.type}</span></TableCell>
                                                <TableCell>
                                                    <div className="d-flex justify-content-start">
                                                    <span
                                                        className={`badge badge-xs ${badgeDict[row.status]} mr-10 mt-10 position-relative`}>&nbsp;</span>
                                                        <div className="status">
                                                            <span className="d-block">{row.status}</span>
                                                            <span
                                                                className="small">{this.getSinceTime(row.updatedAt)}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell><a>{row.repoURL}</a></TableCell>
                                                <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                                                <TableCell>{row.completedAt ? new Date(row.completedAt).toLocaleString() : 'N/A'}</TableCell>
                                                <TableCell>
                                                    <PopupState variant="popper" popupId={`moreMenu-${row.id}`}>
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
                                                                                            disabled={row.status === 'completed' || row.status === 'stopped' || row.status === 'stopping'}
                                                                                            onClick={() => {
                                                                                                this.openJobViewDialog(row);
                                                                                                popupState.close();
                                                                                            }}>
                                                                                            <ListItemIcon>
                                                                                                <VisibilityIcon
                                                                                                    fontSize="small"/>
                                                                                            </ListItemIcon>
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                noWrap>
                                                                                                Monitor
                                                                                            </Typography>
                                                                                        </MenuItem>
                                                                                        <MenuItem
                                                                                            disabled={row.status === 'completed' || row.status === 'stopped' || row.status === 'stopping'}
                                                                                            onClick={() => {
                                                                                                this.onStop(row);
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
                                                                                                this.downloadJobResult(row.jobId);
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
                                                                                                this.onDelete(row.jobId);
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
                                                    </PopupState>
                                                    {/*<a href="#" onClick={() => this.onEditUser(row)}></a>*/}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                        colSpan={3}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {'aria-label': 'rows per page'},
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    {loading &&
                    <RctSectionLoader/>
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
                <Dialog
                    onClose={() => this.setState({openJobViewDialog: false})}
                    open={this.state.openJobViewDialog}
                >
                    <DialogContent>
                        {selectedJob !== null && <JobConsole job={selectedJob}/>}
                    </DialogContent>
                </Dialog>
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