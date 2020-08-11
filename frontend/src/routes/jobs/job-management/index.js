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


const jobFields = [
    'Job Id',
    'Design Name',
    'Repo URL',
    'Status',
    'Submission Time',
    'Completion Time',
    'Actions'
];

class JobManagement extends Component {

    state = {
        all: false,
        jobs: null,
        selectedJob: null,
        loading: false, // loading activity
        processing: false,
        submitADesign: false,
        submitDesignDetails: {
            id: '',
            designName: '',
            repoURL: '',
            type: '',
            emailAddress: '',
            status: '',
            lastSeen: '',
            accountType: '',
            regressionScript: '',
            badgeClass: 'badge-success',
            dateCreated: 'Just Now',
            checked: false
        },
        openJobViewDialog: false,
        viewJob: null,
        editJob: null,
        allSelected: false,
        selectedJobs: 0
    };

    componentDidMount() {
        this.getJobs();
    }


    getJobs() {
        const {user} = this.props;
        this.setState({loading: true}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.getJobs().then((res) => {
                    this.setState({jobs: res.data});
                    this.setState({loading: false});
                });
            }).catch((err) => {
                this.setState({loading: false});
                console.log(err);
            });
        });
    }

    postJob(designName, repoURL) {
        const {user} = this.props;
        this.setState({processing: true}, () => {
            user.getIdToken().then((idToken) => {
                api.setToken(idToken);
                api.postJob(designName, repoURL).then((res) => {
                    console.log(res);
                    NotificationManager.success('Job Created!');
                    this.setState({processing: false});
                });
            }).catch((err) => {
                this.setState({processing: false});
                console.log(err);
            });
        });
        this.getJobs();
    }

    /**
     * On Delete
     */
    onDelete(data) {
        this.refs.deleteConfirmationDialog.open();
        this.setState({selectedJob: data});
    }

    /**
     * Delete User Permanently
     */
    deleteUserPermanently() {
        const {selectedJob} = this.state;
        let users = this.state.jobs;
        let indexOfDeleteUser = users.indexOf(selectedJob);
        users.splice(indexOfDeleteUser, 1);
        this.refs.deleteConfirmationDialog.close();
        this.setState({loading: true});
        let self = this;
        setTimeout(() => {
            self.setState({loading: false, users, selectedJob: null});
            NotificationManager.success('User Deleted!');
        }, 2000);
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
        this.getJobs();
    }

    /**
     * On Select User
     */
    onSelectUser(user) {
        user.checked = !user.checked;
        let selectedUsers = 0;
        let users = this.state.jobs.map(userData => {
            if (userData.checked) {
                selectedUsers++;
            }
            if (userData.id === user.id) {
                if (userData.checked) {
                    selectedUsers++;
                }
                return user;
            } else {
                return userData;
            }
        });
        this.setState({users, selectedUsers: selectedJobs});
    }

    /**
     * On Change Add New User Details
     */
    onChangeSubmitDesignDetails = (key, value) => {
        this.setState({
            submitDesignDetails: {
                ...this.state.submitDesignDetails,
                [key]: value
            }
        });
    };

    /**
     * Add New User
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
     * View User Detail Hanlder
     */
    viewUserDetail(data) {
        // this.setState({openViewUserDialog: true, selectedUser: data});
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
        let users = this.state.jobs;
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

    //Select All user
    onSelectAllUser(e) {
        const {selectedJobs, jobs} = this.state;
        let selectAll = selectedJobs < jobs.length;
        if (selectAll) {
            let selectAllUsers = jobs.map(user => {
                user.checked = true;
                return user
            });
            this.setState({users: selectAllUsers, selectedJobs: selectAllUsers.length})
        } else {
            let unselectedUsers = jobs.map(user => {
                user.checked = false;
                return user;
            });
            this.setState({selectedJobs: 0, users: unselectedUsers});
        }
    }

    render() {
        const {location} = this.props;
        const {jobs, processing, loading, selectedJob, editJob, allSelected, selectedJobs} = this.state;
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
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.onReload()}
                                   className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.opnSubmitADesign()} color="primary"
                                   className="caret btn-sm mr-10"><i className="zmdi zmdi-plus"></i> Submit Design</a>
                            </div>
                        </div>
                        <table className="table table-middle table-hover mb-0">
                            <thead>
                            <tr>
                                <th className="w-5">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                indeterminate={selectedJobs > 0 && selectedJobs < jobs.length}
                                                checked={selectedJobs > 0}
                                                onChange={(e) => this.onSelectAllUser(e)}
                                                value="all"
                                                color="primary"
                                            />
                                        }
                                        label="All"
                                    />
                                </th>
                                {jobFields && jobFields.map((jobField, key) => (
                                    <th key={key}>{jobField}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {jobs && jobs.map((job, key) => (
                                <tr key={key}>
                                    <td>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={job.checked}
                                                    onChange={() => this.onSelectUser(job)}
                                                    color="primary"
                                                />
                                            }
                                        />
                                    </td>
                                    <td>{job.id}</td>
                                    <td>{job.designName}</td>
                                    <td className="d-flex justify-content-start">
                                        <span
                                            className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                                        <div className="status">
                                            <span className="d-block">{job.status}</span>
                                            <span className="small">Since 1 hour</span>
                                        </div>
                                    </td>
                                    <td><a>{job.repoURL}</a></td>
                                    <td>{new Date(job.createdAt).toLocaleString()}</td>
                                    <td>{job.completedAt ? new Date(job.completedAt).toLocaleString() : 'N/A'}</td>
                                    <td className="list-action">
                                        <a href="#" onClick={() => this.openJobViewDialog(job)}><i
                                            className="ti-eye"></i></a>
                                        <a href="#" onClick={() => this.onEditUser(job)}><i
                                            className="ti-pencil"></i></a>
                                        <a href="#" onClick={() => this.onDelete(job)}><i
                                            className="ti-close"></i></a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot className="border-top">
                            <tr>
                                <td colSpan="100%">
                                    <Pagination className="mb-0 py-10 px-10">
                                        <PaginationItem>
                                            <PaginationLink previous href="#"/>
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="javascript:void(0)">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="javascript:void(0)">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="javascript:void(0)">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink next href="javascript:void(0)"/>
                                        </PaginationItem>
                                    </Pagination>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    {loading &&
                    <RctSectionLoader/>
                    }
                </RctCollapsibleCard>
                <DeleteConfirmationDialog
                    ref="deleteConfirmationDialog"
                    title="Are you sure?"
                    message="This will delete the job permanently."
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
            </div>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps, {})(JobManagement);