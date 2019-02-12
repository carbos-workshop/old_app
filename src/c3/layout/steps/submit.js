import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import {
  updateC3OwnerAddress
} from '../../c3Actions'
import { connectToMetaMask, web3 } from '../../../util/connectors' // { uport }
import { trimDecimals } from '../../../util/utils' // { uport }
import Web3 from 'web3'
import convert from '../../conversions'
import {
  calculateActualLandArea,
} from '../../utils'
import GAIA from '../../../abis/Gaia.json'
console.log('GAIA->',GAIA);

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  explaination: {
    margin: theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  etherscanLink: {
    color: theme.palette.text.primary
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    onC3OwnerAddressUpdate: address => {
      dispatch(updateC3OwnerAddress(address))
    },
  }
}

const mapStateToProps = (state) => {
  return {
    c3: state.c3,
    user: state.user.data
  }
}

class Submit extends React.Component{

  state = {
    txHash: null,
    loading: {
      active: true,
      type: 'Connecting to Meta Mask...'
    },
    metaMaskFailure: false,
  }

  componentDidMount(){

  connectToMetaMask().then(res => {
    if (res === false){
      this.setState({
        metaMaskFailure: true,
        loading: {
          active: true,
          type: 'Failed to Connect to Meta Mask.'
        }
      })
    }
    else if (res[0]){
      this.props.onC3OwnerAddressUpdate(res[0])
      this.setState({
        loading: {
          ...this.state.loading,
          type: 'Building Transaction...'
        }
      })
      this.deployC3(res[0])
    } else {console.log('There was a problem connecting to Meta Mask')}
  })

  }

  deployC3 = async (account)  => {
    console.log('sending from  -> ', account);
    let c3data = this.buildC3Object()
    let web3 = new Web3(window.web3.currentProvider)
    let gaia = new web3.eth.Contract(GAIA.abi, GAIA.networks[4].address)
    let deposit = (this.props.c3.carbon.total * this.props.c3.ppt)/20 //5% depoist
    let contractCall = await gaia.methods.genC3(
      c3data.totalCarbon,
      c3data.aboveGroundCarbon,
      c3data.belowGroundCarbon,
      c3data.hectares,
      c3data.latitude,
      c3data.longitude,
      c3data.raId,
      c3data.ppt,
      c3data.description,
      c3data.geometryHash).send({ from: account , value: web3.utils.toWei(trimDecimals(deposit,18).toString()) }, (err, res) => {
        this.setState({
          ...this.state,
          txHash: res,
          loading: {
            active: true,
            type: "Transaction Sent. Awaitng Confirmation... (It's not unusual for this to take 5 minutes)",
          }
        })
      })

    this.setState({
      loading: {
        active: false,
      },
      newC3Address: contractCall.events.Generated.returnValues.contractAddress,
    })
      //contractCall.events.Generated.returnValues.contractAddress //C3 address "0x9C839d96eBC28868844E7736cF62128D44281D8F"
      //contractCall.events.Generated.returnValues.escrowAddress //escrow Address

  }

  buildC3Object = () => {
    //lat_lng being more flexible, ra_id tying up completely to reportall
    return {
      geometryHash: web3.utils.soliditySha3(this.props.c3.property.geom_as_wkt), //hash of the property's multipolygon shape (ESRI LAT/LNG PAIRS)
      raId: this.props.c3.property.rausa_id, //reportall lookup
      latitude: web3.utils.toWei(this.props.c3.property.latitude.toString()),
      longitude: web3.utils.toWei(this.props.c3.property.longitude.toString()),
      ppt: web3.utils.toWei(trimDecimals(this.props.c3.ppt,18).toString()),
      hectares: web3.utils.toWei(trimDecimals((convert.acresToSquareMeters(calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft))/10000),18).toString()), //area in hectares
      address: this.props.c3.owner.address, //set by uPort, overwritten by MetaMask in submit process
      description: this.props.c3.description, //ELU code
      aboveGroundCarbon: web3.utils.toWei(trimDecimals(this.props.c3.carbon.aboveGround,18).toString()),
      belowGroundCarbon: web3.utils.toWei(trimDecimals(this.props.c3.carbon.belowGround,18).toString()),
      totalCarbon: web3.utils.toWei(trimDecimals(this.props.c3.carbon.total,18).toString()),
    }

  }


  render(){
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {
          this.state.loading.active
          ?
            <div className={classes.loadingRoot}>
              <div className={classes.loadingRoot}>
                <Typography className={classes.explaination} variant="body2">
                  {this.state.loading.type}
                </Typography>
                <LinearProgress className={(this.state.metaMaskFailure ? classes.hidden : null)}/>
              </div>
              {
                this.state.txHash
                ?
                <Typography className={classes.explaination} variant="body2">
                <Button>
                  <a className={classes.etherscanLink} target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/tx/${this.state.txHash}`}>View Transaction on Etherscan</a>
                </Button>
                </Typography>
                : null
              }
            </div>
          :
          <div className={classes.loadedRoot}>
            <Typography className={classes.explaination} variant="body2">
              Transaction sucessfully mined.
            </Typography>
            <Typography className={classes.explaination} variant="body2">
            <Button>
              <a className={classes.etherscanLink} target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/tx/${this.state.txHash}`}>View Transaction on Etherscan</a>
            </Button>
            </Typography>
          </div>
        }
      </div>
    )
  }
}

const SubmitWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(Submit))

export default SubmitWrapper
