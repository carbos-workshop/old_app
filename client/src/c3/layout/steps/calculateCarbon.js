import React from  'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames'
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
  encounteredC3ApiError,
} from '../../c3Actions'
import {
  trimDecimals
} from '../../../util/utils.js'
import convert from '../../conversions'
import PieChart from 'react-chartjs-2'
import Warning from '../../../components/warning'
import { calculateActualLandArea } from '../../utils'

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
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
    setC3ApiError: status => {
      dispatch(encounteredC3ApiError(status))
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
    flexDirection: 'column',
  },
  statsWrapper: {
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
  statsHighlight:{
    color: theme.palette.primary.main,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  statsHeader:{
    marginTop: theme.spacing.unit,
    fontWeight: '700',
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '250px',
    width: '500px',
  },
  chart: {
    // height: '200px',
    // width: '500px'
  },
  helplink:{
    color: theme.palette.primary.light,
    fontWeight: '700'
  },
  bold: {
    fontWeight: '700',
    color: theme.palette.primary.main,
  },
  centered: {
    textAlign: 'center',
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
            calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
            res.data.properties
          )
        )
        this.responseReceived('belowGround')
      })
      .catch( error => {
        this.receivedApiError(error)
      })
    getEcologicalLandUnits(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        this.props.onC3ELUDescriptionUpdate(res.data.results[1].attributes.ELU)
        this.responseReceived('description')
      })
      .catch( error => {
        this.receivedApiError(error)
      })
    getBiomass(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        if (!res.data.results.length) {
          console.error('unexpected response from EPA Biomass API', res)
        }
        else {
          this.props.onC3AboveGroundCarbonUpdate(
            this.calculateAboveGroundCarbon(
              calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft),
              parseFloat(res.data.results[1].attributes.Biomass_pe)
            )
          )
          this.responseReceived('aboveGround')
        }
      })
      .catch( error => {
        this.receivedApiError(error)
      })
  }

  //returns metric tons of CO2
  //@param area = area in acres
  //TODO: CHANGE TO ORCSTHA
  //@param data contains two major objects ORCDRC (organic carbon content permille) and BLDFIE (bulk earth density kg/m3)
  calculateBelowGroundCarbon = (area, data) => {
    //average the BLDFIE densities across soil slices and multiply by slice volume to get kg soil per 'slice'
    //then average ORCDRC ermilles across the 'slice' height take the permille of the 'slice'
    let slice1 = ((data.BLDFIE.M.sl1 + data.BLDFIE.M.sl2)/2) * (convert.acresToSquareMeters(area) * .05) * (((data.ORCDRC.M.sl1 + data.ORCDRC.M.sl2)/2)/1000)
    let slice2 = ((data.BLDFIE.M.sl2 + data.BLDFIE.M.sl3)/2) * (convert.acresToSquareMeters(area) * .1) * (((data.ORCDRC.M.sl2 + data.ORCDRC.M.sl3)/2)/1000)
    let slice3 = ((data.BLDFIE.M.sl3 + data.BLDFIE.M.sl4)/2) * (convert.acresToSquareMeters(area) * .15) * (((data.ORCDRC.M.sl3 + data.ORCDRC.M.sl4)/2)/1000)
    return convert.kilogramsToTons(slice1 + slice2 + slice3) * .9 //TEMP * .9 temp band aid to subtract out soil coarse fragments
  }


  receivedApiError = error => {
    console.log(error);
    this.props.setC3ApiError(true)
    this.setState({
      apiError: true
    })
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

  render(){
    const { classes } = this.props

    const chartData = {
        labels: [ "Soil", "Biomass" ],
        datasets: [{
            data: [trimDecimals(this.props.c3.carbon.belowGround), trimDecimals(this.props.c3.carbon.aboveGround)],
            backgroundColor: [
                this.props.theme.palette.grey[800],
                this.props.theme.palette.grey[600],
            ],
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

            this.state.apiError
            ?
            <Warning title="API ERROR">
              This is likely a temporary issue.  If it persists, contact <a className={classes.helplink} href="mailto:help@carbos.co">help@carbos.co</a>
            </Warning>
            :
            <div className={classes.loadedRoot}>
              <Typography className={classNames([classes.statsHeader,classes.explaination, classes.centered])} variant="h5">
                This property holds up to
                <span className={classes.statsHighlight}>{trimDecimals(this.props.c3.carbon.total)}</span>
                tons of CO<sub>2</sub>!
              </Typography>
              <div className={classes.statsWrapper}>
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
                    Total Storage
                  </Typography>
                  <Typography className={classes.stats} variant="subtitle1">
                    <span className={classes.bold}>{trimDecimals(this.props.c3.carbon.total)}</span> tCO<sub>2</sub>e
                  </Typography>
                  <Typography className={classes.statsHeader} variant="body1">
                    Above Ground CO<sub>2</sub>
                  </Typography>
                  <Typography className={classes.stats} variant="subtitle1">
                    <span className={classes.bold}>{trimDecimals(this.props.c3.carbon.aboveGround)}</span> tons
                  </Typography>
                  <Typography className={classes.statsHeader} variant="body1">
                    Below Ground CO<sub>2</sub>
                  </Typography>
                  <Typography className={classes.stats} variant="subtitle1">
                    <span className={classes.bold}>{trimDecimals(this.props.c3.carbon.belowGround)}</span> tons
                  </Typography>
                </div>
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
