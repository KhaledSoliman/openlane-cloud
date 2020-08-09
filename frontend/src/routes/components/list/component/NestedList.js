/**
 * Nested List Component
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class NestedListComponent extends Component {

    state = {
        open: false
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.nestedLists" />}
            >
                <List subheader={<ListSubheader>Nested List Items</ListSubheader>}>
                    <ListItem button>
                        <ListItemIcon><i className="zmdi zmdi-mail-send"></i></ListItemIcon>
                        <ListItemText inset primary="Sent mail" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <i className="zmdi zmdi-email-open zmdi-hc-lg"></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Drafts" />
                    </ListItem>
                    <ListItem button onClick={() => this.setState({ open: !this.state.open })}>
                        <ListItemIcon>
                            <i className="zmdi zmdi-inbox zmdi-hc-lg"></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Inbox" />
                        {this.state.open ? <i className="zmdi zmdi-chevron-down zmdi-hc-lg"></i> : <i className="zmdi zmdi-chevron-up zmdi-hc-lg"></i>}
                    </ListItem>
                    <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="zmdi zmdi-star zmdi-hc-lg"></i>
                                </ListItemIcon>
                                <ListItemText inset primary="Starred" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </RctCollapsibleCard>
        );
    }
}

export default NestedListComponent;