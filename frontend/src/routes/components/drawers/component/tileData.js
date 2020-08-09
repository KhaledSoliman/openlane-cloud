import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-inbox zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-star zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-mail-send zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-email-open zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-email zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-delete zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <i className="zmdi zmdi-alert-octagon zmdi-hc-lg"></i>
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);
