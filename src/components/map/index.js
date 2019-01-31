import React from 'react'
import PropTypes from 'prop-types';
import { withTheme, withStyles } from '@material-ui/core/styles';

import {
  Map,
  Polygon,
  // Marker,
  // Popup,
  // Rectangle,
  TileLayer,
} from 'react-leaflet'
import Wkt from 'wicket'
// import L from 'leaflet';
// const styles = theme => ({
//   root: {
//
//   }
// })

const styles = theme => ({
  root: {
    height: '500px'
  }
})

class LeafletMap extends React.Component {

  state = {
      tiles: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
  }

  readGeometry = geometry => {
    let wkt = new Wkt.Wkt()
    wkt.read(geometry)
    console.log(wkt.components);
    return wkt.toJson()
  }

  componentDidMount(){
    // console.log(this.props);
    // this.readGeometry(this.props.geometry)
  }

  render(){
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Map style={{height:'500px'}} center={this.props.center} zoom={16}>
          <TileLayer
            url={this.state.tiles}
          	attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          	subdomains='abcd'
          />
        <Polygon color={'red'} positions={this.props.polygon}>
          </Polygon>
        </Map>
      </div>
    )
  }
}
/*
*/

LeafletMap.defaultProps = {
  center: [39.7392, -104.9903],
  polygon: [[ 39.6125972845498,-104.921298536263],[39.6120259701034,-104.92130044769],[39.6120376089511,-104.921992613112],[39.6124785821555,-104.921992324116],[39.6126050156913,-104.921991460977],[39.6125972845498, -104.921298536263]]
}
LeafletMap.propTypes = {
  center: PropTypes.array,
  polygon: PropTypes.array,
  geometry: PropTypes.string,
  // theme: PropTypes.object.isRequired,
}

export default withTheme()(withStyles(styles)(LeafletMap))
