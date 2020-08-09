/**
* List Dividers
*/
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Scrollbars } from 'react-custom-scrollbars';

const InsetDivider = () => (
	<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350}>
		<List className="p-0">
			<ListItem button>
				<Avatar className="bg-pink">
					<i className="zmdi zmdi-folder"></i>
				</Avatar>
				<ListItemText primary="Work" secondary="Jan 28, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-info">
					<i className="zmdi zmdi-cloud-download"></i>
				</Avatar>
				<ListItemText primary="Downloads" secondary="Jan 20, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-danger">
					<i className="zmdi zmdi-camera"></i>
				</Avatar>
				<ListItemText primary="Photos" secondary="Jan 20, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-primary">
					<i className="zmdi zmdi-archive"></i>
				</Avatar>
				<ListItemText primary="Primary" secondary="Jan 20, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-success">
					<i className="zmdi zmdi-share"></i>
				</Avatar>
				<ListItemText primary="Social" secondary="Jan 18, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-warning">
					<i className="zmdi zmdi-lock"></i>
				</Avatar>
				<ListItemText primary="Private" secondary="Jan 15, 2014" />
			</ListItem>
			<Divider inset />
			<ListItem button>
				<Avatar className="bg-info">
					<i className="zmdi zmdi-folder-star-alt"></i>
				</Avatar>
				<ListItemText primary="Important" secondary="Jan 2, 2014" />
			</ListItem>
		</List>
	</Scrollbars>
);
export default InsetDivider;
