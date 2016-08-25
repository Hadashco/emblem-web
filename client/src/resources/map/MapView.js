import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Rectangle, InfoWindow } from 'react-google-maps';
import { connection } from './MapModel.js';

class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sectors: [],
    };
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerRightclick = this.onMarkerRightclick.bind(this);
    this.onSectorMouseover = this.onSectorMouseover.bind(this);
    this.sectors = [];
    this.sectorColor = '#3d3d3d';
    this.sector = 'Center Sector!';
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
          defaultAnimation: 2,
        }
      );
      this.props.addMarkerToMapStateSwitch();
      this.props.switchUploadModalState();
    }
  }

  onSectorMouseover(index, position) {
    this.sector = 'The sector at this location is: ' + index;
    this.sectorPosition = position;
  }


  onMarkerRightclick(index) {
    this.props.removeMarker(index);
  }

  createSectorsForMap() {
    fetch('/artPlace/max/rank', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
      },
    }).then(response => response.json()).then(body => {
      // using the id i should get back from body, I'd make
      // another call to max rank at the id the square is located at
      // then using the user id i get back from that route, ill grab
      // the user color to save in the sectorColor for each individual
      // sector
      const LAT_LONG_TRUNCATE = 3;
      for (let place = 0; place < body.length; place++) {
        this.sectors.push({
          // The subtracting .0005 is to account for the automatic rounding done
          // by the Number.prototype.toFixed() function
          north: Number((body[place].lat - 0.0005).toFixed(LAT_LONG_TRUNCATE)) + 0.001,
          south: Number((body[place].lat - 0.0005).toFixed(LAT_LONG_TRUNCATE)),
          east: Number((body[place].long - 0.0005).toFixed(LAT_LONG_TRUNCATE)) + 0.001,
          west: Number((body[place].long - 0.0005).toFixed(LAT_LONG_TRUNCATE)),
          sectorColor: body[place].markerColor, // user color
        });
      }
      this.setState({ sectors: this.sectors });
    });
  }

  render() {
    const context = this;
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
                options={{ minZoom: 15 }}
              >
                {this.props.markers.map((marker, index) =>
                  <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.long }}
                    onRightclick={() => this.onMarkerRightclick(index)}
                  />
                )}
                {this.state.sectors.map((sector, index) =>
                  <Rectangle
                    key={index}
                    bounds={{
                      north: sector.north,
                      south: sector.south,
                      east: sector.east,
                      west: sector.west }}
                    onMouseover={() => this.onSectorMouseover(index, {
                      lat: sector.north,
                      lng: sector.east })}
                    options={{
                      strokeColor: '#FFFF00',
                      fillColor: sector.sectorColor,
                      strokeOpacity: 0,
                      strokeWeight: 0,
                      fillOpacity: 0.35,
                    }}
                  />
                )}
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
