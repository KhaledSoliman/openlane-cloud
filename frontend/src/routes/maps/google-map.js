/**
 * Google Map
 */
import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class GoogleMapComponent extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };
  static defaultProps = {
    center: [51.5074, 0.1278],
    zoom: 9,
    greatPlaceCoords: { lat: 51.5074, lng: 0.1278 }
  };
  renderMarkers(map, maps) {
    new maps.Marker({
      position: { lat: 51.5074, lng: 0.1278 },
      map,
      title: 'London'
    });
  }

  render() {
    return (
      <div className="map-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.googleMaps" />} match={this.props.match} />
        <RctCollapsibleCard heading="Google Maps">
          <GoogleMap
            bootstrapURLKeys={{ key: "AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk" }}
            yesIWantToUseGoogleMapApiInternals={true}
            center={this.props.center}
            zoom={this.props.zoom} style={{ position: 'relative', width: '100%', height: 400 }}
            onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          />
        </RctCollapsibleCard>
      </div>
    );
  }
}
