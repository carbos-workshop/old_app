import React from  'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {
  getSoilCarbon,
  getEcologicalLandUnits,
  getBiomass
} from '../../requests'
import convert from '../conversions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onOwnerFirstnameUpdate: name => {
    //   dispatch(updateC3OwnerFirstname(name))
    // },
  }
}

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  loadedRoot:{

  },
  inline: {
    display: 'inline',
  },
  explaination: {
    margin: theme.spacing.unit,
  },
})

class CalculateCarbon extends React.Component{

  state = {
    loading: true
  }

  componentWillMount(){
    // console.log(this.props);
    getSoilCarbon(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        console.log('SOIL ->',
          this.calculateBelowGroundCarbon(
            this.calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
            res.data.properties
          )
        )
      })
      .catch( error => {
        console.log(error);
      })
    getEcologicalLandUnits(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        console.log('ELU ->',
        res.data.results[1].attributes.ELU_GLC_De,
        res.data.results[1].attributes.ELU_Site,)
      })
      .catch( error => {
        console.log(error);
      })
    getBiomass(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        if (!res.data.results.length) {
          console.error('unexpected response from EPA Biomass API', res)
        }
        else {
          console.log('BIO ->',
            this.calculateAboveGroundCarbon(
              this.calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
              parseFloat(res.data.results[1].attributes.Biomass_pe)
            )
          )
        }
      })
      .catch( error => {
        console.log(error);
      })
  }

  //returns metric tons of CO2
  //@param area = area in acres
  //@param data contains two major objects ORCDRC (organic carbon content permille) and BLDFIE (bulk earth density kg/m3)
  calculateBelowGroundCarbon = (area, data) => {
    //average the BLDFIE densities across soil slices and multiply by slice volume to get kg soil per 'slice'
    //then average ORCDRC ermilles across the 'slice' height take the permille of the 'slice'
    let slice1 = ((data.BLDFIE.M.sl1 + data.BLDFIE.M.sl2)/2) * (convert.acresToSquareMeters(area) * .05) * (((data.ORCDRC.M.sl1 + data.ORCDRC.M.sl2)/2)/1000)
    let slice2 = ((data.BLDFIE.M.sl2 + data.BLDFIE.M.sl3)/2) * (convert.acresToSquareMeters(area) * .1) * (((data.ORCDRC.M.sl2 + data.ORCDRC.M.sl3)/2)/1000)
    let slice3 = ((data.BLDFIE.M.sl3 + data.BLDFIE.M.sl4)/2) * (convert.acresToSquareMeters(area) * .15) * (((data.ORCDRC.M.sl3 + data.ORCDRC.M.sl4)/2)/1000)
    return convert.kilogramsToTons(slice1 + slice2 + slice3)
  }

  calculateActualLandArea = (total, building) => {
    if (building) {
      return total - convert.squareFeetToAcres(building)
    }
    else {
      console.log('No building footprint provided to calculate actual land area.')
      return total
    }
  }

  //@param ratio = Tg Biomass per square mile
  //@param area = area in acres
  //returns metric tons of CO2
  calculateAboveGroundCarbon = (area, ratio) => {
    //very "alpha" approximate carbon/weight ratio calc
    return convert.teragramsToTons(convert.acresToSquareMiles(area) * ratio) * 0.47
  }


  render(){
    const { classes } = this.props
    return(
      <div className={classes.root}>
        {
          this.state.loading
          ?
          <div className={classes.loadingRoot}>
            <Typography className={classes.explaination} variant="body2">
              Calculating...
            </Typography>
            <LinearProgress />
          </div>
          :
          <div className={classes.loadedRoot}>

          </div>
        }
      </div>
    )
  }
}

const CalculateCarbonWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalculateCarbon))

export default CalculateCarbonWrapper
