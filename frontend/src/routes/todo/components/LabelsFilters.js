/**
 * Labels Filters
 * Used To Filter Todo List
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { connect } from 'react-redux';
import classnames from 'classnames';

// redux action
import { activateFilterAction } from 'Actions';

class LabelsFilters extends Component {

    /**
     * Function to filter the todo list with labels
     */
    onFilterTodo(activeIndex) {
        this.props.activateFilterAction(activeIndex);
    }

    /**
     * Get Label Classes
     */
    getLabelClasses(value) {
        let labelClasses = '';
        switch (value) {
            case 1:
                labelClasses = 'ladgend bg-success';
                return labelClasses;
            case 2:
                labelClasses = 'ladgend bg-primary';
                return labelClasses;
            case 3:
                labelClasses = 'ladgend bg-info';
                return labelClasses;
            case 4:
                labelClasses = 'ladgend bg-danger';
                return labelClasses;
            default:
                return labelClasses;
        }
    }

    render() {
        const { labels, activeFilter } = this.props;
        return (
            <div className="rct-full-block filters">
                <div className="rct-block-content">
                    <List className="list-unstyled" subheader={<ListSubheader>Labels</ListSubheader>}>
                        {labels.map((label, key) => (
                            <ListItem button onClick={() => this.onFilterTodo(label.value)} key={key} className={classnames({ 'item-active': activeFilter === label.value })}>
                                <span className={this.getLabelClasses(label.value)}></span> <span className="filter-title">{label.name}</span>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ todoApp }) => {
    const { labels, activeFilter } = todoApp;
    return { labels, activeFilter };
};

export default connect(mapStateToProps, {
    activateFilterAction
})(LabelsFilters);
