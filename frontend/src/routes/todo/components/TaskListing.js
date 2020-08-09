/**
 * Task Listing Component
 * Used To Display Task List
 */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';

// components
import TodoListItem from './TodoListItem';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// redux action
import {
    onSelectTodoAction,
    hideLoadingIndicatorAction,
    fetchTodos,
    onCheckBoxToggleTodoItem,
    selectAllTodo,
    getUnselectedAllTodo,
    selectStarredTodo,
    selectUnStarredTodo,
    onLabelSelect,
    onLabelMenuItemSelect
} from 'Actions';

// options
import options from 'Assets/data/todo-app/options';

const SortableList = ({ toDos, onSelectTodo, onCheckBoxClickTodoItem, getTaskLabelNames }) => (
    <ul className="list-unstyled todo-all-list mb-0">
        {(toDos && toDos !== null) && toDos.map((todo, key) => {
            return (
                <TodoListItem
                    key={key}
                    todo={todo}
                    sortIndex={key}
                    index={key}
                    onSelectTodo={onSelectTodo}
                    onCheckBoxClickTodoItem={onCheckBoxClickTodoItem}
                    getTaskLabelNames={getTaskLabelNames}
                />
            )
        })}
    </ul>
);

class TaskListing extends Component {

    state = {
        anchorEl: null,
        labelMenu: false,
        optionsMenu: false
    }

    componentWillMount() {
        this.props.fetchTodos();
    }

    /**
     * Function to return task label name
     */
    getTaskLabelNames = (taskLabels) => {
        let elements = [];
        const { labels } = this.props;
        for (const taskLabel of taskLabels) {
            for (const label of labels) {
                if (label.value === taskLabel) {
                    let ele = <span key={label.value}
                        className={classnames('badge badge-pill', { 'badge-success': label.value === 1, 'badge-primary': label.value === 2, 'badge-info': label.value === 3, 'badge-danger': label.value === 4 })}
                    >
                        <IntlMessages id={label.name} />
                    </span>;
                    elements.push(ele);
                }
            }
        }
        return elements;
    }

    /**
     * On Checkbox click todo item
     */
    onCheckBoxClickTodoItem = (todo) => {
        this.props.onCheckBoxToggleTodoItem(todo);
    }

    /**
     * On Select Todo List Item
     */
    onSelectTodo = (todo) => {
        this.props.onSelectTodoAction(todo);
        setTimeout(() => {
            this.props.hideLoadingIndicatorAction();
        }, 1200);
    }

    handleClose = () => {
        this.setState({ anchorEl: null, labelMenu: false, optionsMenu: false });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget, optionsMenu: true });
    }

    /**
     * on all todo select
     */
    onAllTodoSelect() {
        const selectAll = this.props.selectedToDos < this.props.toDos.length;
        if (selectAll) {
            this.props.selectAllTodo();
        } else {
            this.props.getUnselectedAllTodo();
        }
    }

    /**
     * on option menu select
     */
    onOptionMenuItemSelect(option) {
        switch (option.title) {
            case 'All':
                this.handleClose();
                this.props.selectAllTodo();
                break;
            case 'None':
                this.handleClose();
                this.props.getUnselectedAllTodo();
                break;
            case 'Starred':
                this.handleClose();
                this.props.selectStarredTodo();
                break;
            case 'Unstarred':
                this.handleClose();
                this.props.selectUnStarredTodo();
                break;
            default:
                break;
        }
    };

    /**
     * On Label Select Menu
     */
    onLabelSelect = event => {
        this.props.onLabelSelect();
        this.setState({
            anchorEl: event.currentTarget,
            labelMenu: true
        });
    };

    /**
     * On Label Select
     */
    onLabelMenuItemSelect(label) {
        this.handleClose();
        this.props.onLabelMenuItemSelect(label);
    }

    /**
	 * Get Scroll Height
	 */
    getScrollHeight() {
        const { location } = this.props;
        const appLayout = getAppLayout(location)
        switch (appLayout) {
            case 'app':
                return 'calc(100vh - 197px)';
            case 'agency':
                return 'calc(100vh - 382px)';
            case 'boxed':
                return 'calc(100vh - 382px)';
            case 'horizontal':
                return 'calc(100vh - 248px)';
            default:
                break;
        }
    }

    render() {
        const { toDos, selectedToDos, labels } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className="list-wrap">
                <div className="top-head">
                    <Checkbox color="primary"
                        indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
                        checked={selectedToDos > 0}
                        onChange={() => this.onAllTodoSelect()}
                        value="SelectMail"
                    />
                    <IconButton onClick={this.handleClick} aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true">
                        <i className="zmdi zmdi-caret-down"></i>
                    </IconButton>
                    {(selectedToDos > 0) &&
                        <IconButton onClick={this.onLabelSelect.bind(this)}>
                            <i className="zmdi zmdi-label-alt" />
                        </IconButton>}
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={this.state.optionsMenu}
                        onClose={this.handleClose}
                        PaperProps={{
                            style: {
                                width: 200
                            }
                        }}>
                        {options.map((option, key) => (
                            <MenuItem key={key} onClick={() => this.onOptionMenuItemSelect(option)}>{option.title}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu id="label-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.labelMenu}
                        onClose={this.handleClose}
                        MenuListProps={{
                            style: {
                                width: 150,
                            },
                        }}>
                        {labels.map(label =>
                            <MenuItem key={label.value} onClick={() => this.onLabelMenuItemSelect(label)}>
                                <IntlMessages id={label.name} />
                            </MenuItem>,
                        )}
                    </Menu>
                </div>
                <Scrollbars
                    className="rct-scroll"
                    autoHide
                    style={{ height: this.getScrollHeight() }}
                >
                    <SortableList
                        toDos={toDos}
                        onSelectTodo={this.onSelectTodo}
                        onCheckBoxClickTodoItem={this.onCheckBoxClickTodoItem}
                        getTaskLabelNames={this.getTaskLabelNames}
                    />
                </Scrollbars>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ todoApp, settings }) => {
    const { toDos, labels, users, selectedToDos } = todoApp;
    return { toDos, labels, users, selectedToDos, settings };
}

export default withRouter(connect(mapStateToProps, {
    onSelectTodoAction,
    hideLoadingIndicatorAction,
    fetchTodos,
    onCheckBoxToggleTodoItem,
    getUnselectedAllTodo,
    selectAllTodo,
    selectStarredTodo,
    selectUnStarredTodo,
    onLabelSelect,
    onLabelMenuItemSelect
})(TaskListing));
