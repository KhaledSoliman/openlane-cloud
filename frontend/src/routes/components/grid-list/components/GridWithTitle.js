/**
* Grid With Title Bar
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
				<GridList>
					{tileData.map(tile => (
						<GridListTile key={tile.img}>
							<img src={tile.img} alt={tile.title} />
							<GridListTileBar title={tile.title} subtitle={<span>by: {tile.author}</span>}
								actionIcon={<IconButton> <i className="zmdi zmdi-share text-white"></i> </IconButton>} />
						</GridListTile>
					))}
				</GridList>
			</Scrollbars>
		</div>
	);
}

export default ImageGridList;
