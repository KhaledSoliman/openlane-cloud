/**
 * Todo Redux App
 */
import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import $ from 'jquery';
import { Helmet } from "react-helmet";
// component
import AddNewTask from './components/AddNewTask';
import TaskListing from './components/TaskListing';
import TaskStatusFilter from './components/TaskStatusFilter';
import TaskDetails from './components/TaskDetails';


// redux actions
import { closeSnakbarAction, updateSearch, onSearchTodo, getTodos } from 'Actions';

const drawerWidth = 250;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 'auto',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		marginLeft: theme.direction !== 'rtl' ? drawerWidth : 0,
		marginRight: theme.direction === 'rtl' ? drawerWidth : 0,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		}
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
	},
});

class TodoList extends Component {

	state = {
		mobileOpen: false,
	};

	componentWillMount() {
		this.props.getTodos();
	}

	componentDidMount() {
		$('body').css({ 'overflow': 'hidden' });
	}

	componentWillUnmount() {
		$('body').css({ 'overflow': '' });
		$('body').css({ 'overflow-x': 'hidden' });
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	/**
	 * Search Todo Hanlder
	 */
	updateSearch(e) {
		this.props.updateSearch(e.target.value);
		this.props.onSearchTodo(e.target.value);
	}

	render() {
		const { selectedTodo, showMessage, message, searchTodo, theme, classes } = this.props;
		const drawer = (
			<div className="todo-sidebar-wrap">
				<div className="user-wrap d-flex justify-content-between">
					<div className="media align-items-center">
						<img
							src={require('Assets/avatars/user-5.jpg')}
							alt="user-profile"
							className="img-fluid rounded-circle mr-3"
							width="60"
							height="60"
						/>
						<div className="media-body">
							<h5 className="text-white mb-0">Jhon Doe</h5>
							<p className="text-white font-xs mb-0">jhon@example.com</p>
						</div>
					</div>
				</div>
				<AddNewTask />
				<TaskStatusFilter />
			</div>
		);
		return (
			<div className="todo-wrapper">
				<Helmet>
					<title>Todo App</title>
					<meta name="description" content="Todo App" />
				</Helmet>
				<div className={classes.root}>
					<AppBar className={classes.appBar} position="static">
						<Toolbar className="d-flex justify-content-between">
							<IconButton
								aria-label="open drawer"
								onClick={this.handleDrawerToggle}
								className={classes.navIconHide}>
								<MenuIcon />
							</IconButton>
							<FormGroup className="mb-0 w-25">
								<Input type="search"
									name="search"
									id="search-todo"
									className="has-input-right"
									placeholder="Search.."
									onChange={(e) => this.updateSearch(e)}
									value={searchTodo}
								/>
							</FormGroup>
							<div className="d-flex align-items-center">
								<IconButton className="mx-1 btn-sm">
									<i className="zmdi zmdi-arrow-left"></i>
								</IconButton>
								<IconButton className="mx-1 btn-sm">
									<i className="zmdi zmdi-arrow-right"></i>
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>
					<Hidden mdUp className="todo-list-wrap">
						<Drawer
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={this.state.mobileOpen}
							onClose={this.handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true,
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden smDown implementation="css" className="todo-list-wrap">
						<Drawer
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<div className={`bg-transparent ${classes.content}`}>
						<div className={classes.toolbar} />
						{selectedTodo === null ?
							<TaskListing />
							: <TaskDetails />
						}
					</div>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={showMessage}
					message={<span id="message-id">{message}</span>}
					autoHideDuration={1000}
					onClose={() => this.props.closeSnakbarAction()}
				/>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ todoApp, settings }) => {
	const { selectedTodo, message, showMessage, searchTodo } = todoApp;
	return { selectedTodo, message, showMessage, searchTodo, settings };
}

export default connect(mapStateToProps, {
	closeSnakbarAction,
	updateSearch,
	onSearchTodo,
	getTodos
})(withStyles(styles, { withTheme: true })(TodoList));
