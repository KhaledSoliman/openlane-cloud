/**
 * User Block Component
 */
import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Badge} from 'reactstrap';
import {NotificationManager} from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import {logoutUserFromFirebase} from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {

    state = {
        userDropdownMenu: false,
        isSupportModal: false
    };

    /**
     * Logout User
     */
    logoutUser() {
        this.props.logoutUserFromFirebase();
    }

    /**
     * Toggle User Dropdown Menu
     */
    toggleUserDropdownMenu() {
        this.setState({userDropdownMenu: !this.state.userDropdownMenu});
    }

    /**
     * Open Support Modal
     */
    openSupportModal() {
        this.setState({isSupportModal: true});
    }

    /**
     * On Close Support Page
     */
    onCloseSupportPage() {
        this.setState({isSupportModal: false});
    }

    /**
     * On Submit Support Page
     */
    onSubmitSupport() {
        this.setState({isSupportModal: false});
        NotificationManager.success('Message has been sent successfully!');
    }

    render() {
        const {user} = this.props;
        return (
            <div className="top-sidebar">
                <div className="sidebar-user-block">
                    <Dropdown
                        isOpen={this.state.userDropdownMenu}
                        toggle={() => this.toggleUserDropdownMenu()}
                        className="rct-dropdown"
                    >
                        <DropdownToggle
                            tag="div"
                            className="d-flex align-items-center"
                        >
                            <div className="user-profile">
                                <img
                                    src={user.photoURL}
                                    alt="user profile"
                                    className="img-fluid rounded-circle"
                                    width="50"
                                    height="100"
                                />
                            </div>
                            <div className="user-info">
                                <span className="user-name ml-4">{user.displayName.split(" ")[0]}</span>
                                <i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                            <ul className="list-unstyled mb-0">
                                <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                                    <p className="text-white mb-0 fs-14">{user.displayName}</p>
                                    <span className="text-white fs-14">{user.email}</span>
                                </li>
                                <li>
                                    <Link to={{
                                        pathname: '/app/user/user-settings',
                                        state: {activeTab: 0}
                                    }}>
                                        <i className="zmdi zmdi-settings text-primary mr-3"></i>
                                        <IntlMessages id="widgets.settings"/>
                                    </Link>
                                </li>
                                {/*<li>*/}
                                {/*	<Link to={{*/}
                                {/*		pathname: '/app/users/user-profile-1',*/}
                                {/*		state: { activeTab: 2 }*/}
                                {/*	}}>*/}
                                {/*		<i className="zmdi zmdi-comment-text-alt text-success mr-3"></i>*/}
                                {/*		<IntlMessages id="widgets.messages" />*/}
                                {/*		<Badge color="danger" className="pull-right">3</Badge>*/}
                                {/*	</Link>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*	<Link to="/app/pages/feedback">*/}
                                {/*		<i className="zmdi zmdi-edit text-warning mr-3"></i>*/}
                                {/*		<IntlMessages id="sidebar.feedback" />*/}
                                {/*		<Badge color="info" className="pull-right">1</Badge>*/}
                                {/*	</Link>*/}
                                {/*</li>*/}
                                <li className="border-top">
                                    <a href="javascript:void(0)" onClick={() => this.logoutUser()}>
                                        <i className="zmdi zmdi-power text-danger mr-3"></i>
                                        <IntlMessages id="widgets.logOut"/>
                                    </a>
                                </li>
                            </ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <SupportPage
                    isOpen={this.state.isSupportModal}
                    onCloseSupportPage={() => this.onCloseSupportPage()}
                    onSubmit={() => this.onSubmitSupport()}
                />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps, {
    logoutUserFromFirebase
})(UserBlock);
