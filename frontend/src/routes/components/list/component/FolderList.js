/**
 * Folder List Component
 */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const FolderListComponent = () => (
    <RctCollapsibleCard
        heading={<IntlMessages id="widgets.folderLists" />}
    >
        <List className="p-0">
            <ListItem button>
                <Avatar className="bg-primary"><i className="zmdi zmdi-image"></i></Avatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2016" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-success"><i className="zmdi zmdi-folder"></i></Avatar>
                <ListItemText primary="Work" secondary="Jan 7, 2016" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-danger"><i className="zmdi zmdi-favorite"></i></Avatar>
                <ListItemText primary="favorite" secondary="Jan 12, 2016" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-info"><i className="zmdi zmdi-star"></i></Avatar>
                <ListItemText primary="Important" secondary="Jan 15, 2016" />
            </ListItem>
        </List>
    </RctCollapsibleCard>
)

export default FolderListComponent;
