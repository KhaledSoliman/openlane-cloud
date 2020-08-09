/**
* Advanced Grid List
*/
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

// data File
import tileData from './tileData';

function ImageGridList(props) {
	return (
		<div>
			<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450}>
				<GridList spacing={3}>
					{tileData.map(tile => (
						<GridListTile key={tile.img} cols={tile.featured ? 3 : 1} rows={tile.featured ? 2 : 1}>
							<img className="img-fluid" src={tile.img} alt={tile.title} />
							<GridListTileBar className="gradient-overlay" title={tile.title} titlePosition="top"
								actionIcon={<IconButton> <i className="zmdi zmdi-star text-white"></i> </IconButton>} actionPosition="left" />
						</GridListTile>
					))}
				</GridList>
			</Scrollbars>
		</div>
	);
}

export default ImageGridList;
