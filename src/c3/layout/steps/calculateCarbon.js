import React from  'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { withStyles, withTheme } from '@material-ui/core/styles';
import {
  getSoilCarbon,
  getEcologicalLandUnits,
  getBiomass
} from '../../requests'
import {
  updateC3AboveGroundCarbon,
  updateC3BelowGroundCarbon,
  updateC3ELUDescription,
} from '../../c3Actions'
import convert from '../conversions.js'
import PieChart from 'react-chartjs-2'

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onC3AboveGroundCarbonUpdate: carbon => {
      dispatch(updateC3AboveGroundCarbon(carbon))
    },
    onC3BelowGroundCarbonUpdate: carbon => {
      dispatch(updateC3BelowGroundCarbon(carbon))
    },
    onC3ELUDescriptionUpdate: elu => {
      dispatch(updateC3ELUDescription(elu))
    },
  }
}

const styles = theme => ({
  root: {
    // height:'100%'
  },
  loadingRoot: {

  },
  loadedRoot:{
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  carbonStats:{
    flexDirection: 'column',
    // width: '100%',
    // textAlign: 'center',
    display: 'flex',
    // justifyContent: 'space-around'
  },
  explaination: {
    margin: theme.spacing.unit,
  },
  stats: {
    marginLeft: theme.spacing.unit * 2,
  },
  statsHeader:{
    marginTop: theme.spacing.unit * 2,
    fontWeight: '700',
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '200px',
    width: '500px',
  },
  chart: {
    // height: '200px',
    // width: '500px'
  },
})

class CalculateCarbon extends React.Component{

  state = {
    responses: {
      description: false,
      aboveGround: false,
      belowGround: false,
    }
  }

  componentWillMount(){
    getSoilCarbon(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        this.props.onC3BelowGroundCarbonUpdate(
          this.calculateBelowGroundCarbon(
            this.calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
            res.data.properties
          )
        )
        this.responseReceived('belowGround')
      })
      .catch( error => {
        console.log(error);
      })
    getEcologicalLandUnits(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        this.props.onC3ELUDescriptionUpdate(res.data.results[1].attributes.ELU)
        this.responseReceived('description')
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
          this.props.onC3AboveGroundCarbonUpdate(
            this.calculateAboveGroundCarbon(
              this.calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
              parseFloat(res.data.results[1].attributes.Biomass_pe)
            )
          )
          this.responseReceived('aboveGround')
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

  responseReceived = type => {
    this.setState({
      responses:{
        ...this.state.responses,
        [type]: true
      }
    })
  }

  allResponsesReceived = () => {
    return (
      this.state.responses.description
      && this.state.responses.aboveGround
      && this.state.responses.belowGround
    )
  }

  trimDecimals = number => {
    return Number.parseFloat(number).toFixed(2)
  }

  render(){
    const { classes } = this.props

    const chartData = {
        labels: [ "Soil", "Biomass" ],
        datasets: [{
            // label: '# of Votes',
            data: [this.trimDecimals(this.props.c3.carbon.belowGround), this.trimDecimals(this.props.c3.carbon.aboveGround)],
            backgroundColor: [
                '#424242',
                this.props.theme.palette.primary.main,
            ],
            // options: {
            //   hoverBackgroundColor:
            // }
            borderWidth: 0
        }]
    }

    return(
      <div className={classes.root}>
        {
          !this.allResponsesReceived()
          ?
          <div className={classes.loadingRoot}>
            <Typography className={classes.explaination} variant="body2">
              Calculating...
            </Typography>
            <LinearProgress />
          </div>
          :
          <div className={classes.loadedRoot}>
            <div className={classes.chartWrapper}>
              <PieChart
                className={classes.chart}
                data={chartData}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className={classes.carbonStats}>
              <Typography className={classes.statsHeader} variant="body1">
                Ecological Land Unit
              </Typography>
              <Typography className={classes.stats} variant="subtitle1">
                {this.props.c3.description}
              </Typography>
              <Typography className={classes.statsHeader} variant="body1">
                Estimated Carbon Storage
              </Typography>
              <Typography className={classes.stats} variant="subtitle1">
                {this.trimDecimals(this.props.c3.carbon.total)} tCO<sub>2</sub>e
              </Typography>
            </div>
          </div>
        }
      </div>
    )
  }
}

const CalculateCarbonWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(CalculateCarbon)))

export default CalculateCarbonWrapper
