import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Rectangle, InfoWindow } from 'react-google-maps';
import { connection } from './MapModel.js';
import AddMarkerButton from './AddMarkerButton';

class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerRightclick = this.onMarkerRightclick.bind(this);
    this.onSectorMouseover = this.onSectorMouseover.bind(this);
    this.sectors = [];
    this.sectorColor='#3d3d3d';
    this.sector = "Center Sector!";
    this.sectorPosition = { lat: 37.754862, lng: -122.431558 };
  }

  componentDidMount() {
    this.props.populateMarkers();
    this.createSectorsForMap();
  }

  onMapClick(event) {
    if (this.props.addMarkerToMapState) {
      this.props.addMarker(
        {
          key: this.props.markers.length,
          position: event.latLng,
          defaultAnimation: 2
        }
      )
      this.props.addMarkerToMapStateSwitch();
      this.props.switchUploadModalState();
    }
  }

  onSectorMouseover(index, position) {
    this.sector="The sector at this location is: " + index;
    this.sectorPosition = position;
    console.log(this.sector, this.sectorPosition);
  }

  createSectorsForMap() {
    fetch('/artPlace/max/rank', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(response => response.json()).then(body => {
    //using the id i should get back from body, I'd make
    //another call to max rank at the id the square is located at
    //then using the user id i get back from that route, ill grab
    //the user color to save in the sectorColor for each individual
    //sector
    var LAT_LONG_TRUNCATE = 4;
    console.log(body);
    for (var place = 0; place < body.length; place++) {
      this.sectors.push({
        north: body[place].lat.toFixed(LAT_LONG_TRUNCATE)+.0001,
        south: body[place].lat.toFixed(LAT_LONG_TRUNCATE),
        east: body[place].long.toFixed(LAT_LONG_TRUNCATE)+.0001,
        west: body[place].long.toFixed(LAT_LONG_TRUNCATE),
        sectorColor: body.markerColor //user color
      })
    }
  })
    // for (var NScoord = 37.7; NScoord < 37.8; NScoord += .01) {
    //   for (var EWcoord = -122.300; EWcoord > -122.500; EWcoord -= .01) {
    //     this.sectors.push(
    //       {north: NScoord, 
    //         south: NScoord - .01,
    //         east: EWcoord, 
    //         west: EWcoord - .01})
    //   }
    // }
  }

  onMarkerRightclick (index) {
    this.props.removeMarker(index);
  }

  render() {
    var context = this;
    return (
      <span>
        <section className="map">
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props.containerElementProps}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref="map"
                scrollwheel={false}
                defaultZoom={16}
                // TODO: Default to user location
                defaultCenter={{ lat: 37.754862, lng: -122.431558 }}
                onClick={this.onMapClick}
                options={{minZoom: 15}}
              >
                {this.props.markers.map((marker, index) => {
                  return (
                    <Marker
                      key={marker.id}
                      position={{ lat:marker.lat, lng:marker.long }}
                      onRightclick={() => this.onMarkerRightclick(index)} />
                  );
                })}
                {this.sectors.map((sector, index) => {
                  return (
                    <Rectangle
                      key={index}
                      bounds={{north: sector.north, south: sector.south, east: sector.east, west: sector.west}}
                      onMouseover={() => this.onSectorMouseover(index, {lat: sector.north, lng: sector.east})}
                      options={{
                        strokeColor: '#FFFF00',
                        fillColor: sector.sectorColor,
                        strokeOpacity: 0,
                        strokeWeight: 0,
                        fillOpacity: 0.35
                    }} />
                    )
                })}
                <InfoWindow 
                  position={context.sectorPosition}
                  content={context.sector}
                />
              </GoogleMap>
            }
          />
        </section>
      </span>
    );
  }
}

export default connection(MapView);
