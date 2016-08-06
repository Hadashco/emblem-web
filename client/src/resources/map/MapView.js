import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import {connection} from './MapModel.js';

class MapView extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(props, 'these are the props!');
    props.addMarker({key:0, position:{ lat: 37.754862, lng: -122.431558 }});
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
              onClick={this.props.onMapClick}
            >
              {this.props.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onRightclick={() => this.props.onMarkerRightclick(index)} />
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
