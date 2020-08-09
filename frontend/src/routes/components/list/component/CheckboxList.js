/**
 * Checkbox List Component
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const listItems = [
    {
        itemName: 'Facebook',
        status: false,
        icon: 'zmdi zmdi-facebook zmdi-hc-lg'
    },
    {
        itemName: 'Google PLus',
        status: false,
        icon: 'zmdi zmdi-google zmdi-hc-lg'
    },
    {
        itemName: 'Twitter',
        status: false,
        icon: 'zmdi zmdi-twitter zmdi-hc-lg'
    },
    {
        itemName: 'RSS',
        status: false,
        icon: 'zmdi zmdi-rss zmdi-hc-lg'
    },
    {
        itemName: 'Android',
        status: false,
        icon: 'zmdi zmdi-android zmdi-hc-lg'
    }
]

class CheckboxListComponent extends Component {
    // Interactive State
    state = {
        listItems
    };
    handleToggleListItems(key) {
        let items = this.state.listItems;
        items[key].status = !items[key].status;
        this.setState({ [listItems]: items });
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.checkboxListControl" />}
            >
                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={260} autoHide>
                    <List>
                        {this.state.listItems.map((data, key) => (
                            <ListItem button onClick={() => this.handleToggleListItems(key)} key={key}>
                                <Checkbox color="primary" checked={data.status} />
                                <ListItemText primary={data.itemName} />
                                <ListItemSecondaryAction>
                                    <IconButton className="text-indigo"><i className={data.icon}></i></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>
            </RctCollapsibleCard>
        );
    }
}

export default CheckboxListComponent;