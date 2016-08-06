import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import {connection} from './MapModel.js';

class MapView extends React.Component {
  
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);

    this.onMarkerRightclick = this.onMarkerRightclick.bind(this);
  }

  onMapClick(event) {
    this.props.addMarker(
      {
        key: this.props.markers.length,
        position: event.latLng,
        defaultAnimation: 2
      }
    )
    console.log(this.props.markers)
  }

  onMarkerRightclick (index) {
    this.props.removeMarker(index);
  }

  render() {
    return (

      <section className='mapContainer'>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: "95%",
                width: "95%"
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => console.log(map)}
              defaultZoom={12}
              defaultCenter={{ lat: 37.754862, lng: -122.431558 }}
              onClick={this.onMapClick}
            >
              {this.props.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onRightclick={() => this.onMarkerRightclick(index)} />
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

export default connection(MapView);
