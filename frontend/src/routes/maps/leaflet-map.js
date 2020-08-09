/**
 * Leaflet Map
 */
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class LeafletMap extends Component {

  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="map-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.leafletMaps" />} match={this.props.match} />
        <RctCollapsibleCard>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>
        </RctCollapsibleCard>
      </div >
    );
  }
}

export default LeafletMap;
