/**
* List Dividers
*/
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { Badge } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

const ListDivider = () => (
  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350}>
    <List className="p-0">
      <ListItem button>
        <Avatar alt="user 1" className="img-fluid" src={require('Assets/img/user-1.jpg')} />
        <ListItemText primary="Anasmith@example.com" secondary="Jan 2, 2014" />
        <ListItemSecondaryAction>
          <Badge color="success" className="badge-pill">User</Badge>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <Avatar alt="user 2" className="img-fluid" src={require('Assets/img/user-2.jpg')} />
        <ListItemText primary="Rukshana@example.com" secondary="Jan 23, 2014" />
        <ListItemSecondaryAction>
          <Badge color="primary" className="badge-pill">Admin</Badge>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <Avatar alt="user 3" className="img-fluid" src={require('Assets/img/user-3.jpg')} />
        <ListItemText primary="Rose@example.com" secondary="Jan 3, 2014" />
        <ListItemSecondaryAction>
          <Badge color="success" className="badge-pill">User</Badge>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <Avatar alt="user 4" className="img-fluid" src={require('Assets/img/user-4.jpg')} />
        <ListItemText primary="Lilli@example.com" secondary="Jan 18, 2014" />
        <ListItemSecondaryAction>
          <Badge color="warning" className="badge-pill">Follower</Badge>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <Avatar alt="user 5" className="img-fluid" src={require('Assets/img/user-5.jpg')} />
        <ListItemText primary="Anamika@example.com" secondary="Jan 12, 2014" />
        <ListItemSecondaryAction>
          <Badge color="success" className="badge-pill">User</Badge>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Scrollbars>
);
export default ListDivider;
