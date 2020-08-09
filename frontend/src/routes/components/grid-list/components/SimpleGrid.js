/**
* Simple Grid List
*/
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

// data File
import tileData from './tileData';

function ImageGridList(props) {
  return (
    <div>
      <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450}>
        <GridList>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </Scrollbars>
    </div>
  );
}

export default ImageGridList;
