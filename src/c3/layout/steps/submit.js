import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  updateC3OwnerAddress
} from '../../c3Actions'
import { connectToMetaMask, web3 } from '../../../util/connectors' // { uport }
import convert from '../../conversions'
import { calculateActualLandArea } from '../../utils'

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
    loading: {
      active: true,
      type: 'Connecting to Meta Mask...'
    },
    metaMaskFailure: false,
  }

  componentDidMount(){

/*--------------------------UPORT ONLY - BROKEN---------------------------------
    this.deployC3(this.buildC3Transaction('0x0000000000000000000000000000000000000000', this.props.user.address))
-----------------------------------------------------------------------*/
  /*-------------------------METAMASK ONLY---------------------------------*/
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
      this.deployC3(this.buildC3Transaction('0x0000000000000000000000000000000000000000', res[0]))
    } else {console.log('There was a problem connecting to Meta Mask')}
  })
  /*-----------------------------------------------------------------------*/

  }

  buildC3Transaction = (escrow,account)  => {
    console.log('sending from  -> ', account);
    console.log('sending to  -> ', escrow);
    console.log('sending data ->', this.buildC3Object())
/*----------------------------UPORT ONLY - BROKEN------------------------------
    let value = web3.utils.toWei('0.001', 'ether') //any string value higher than this breaks uPort signature feature...
    return {
      from : account,
      to: escrow,
      value: value,
      appName: 'Carbos-Local-Test',
    }
-----------------------------------------------------------------------*/

/* --------------------------METAMASK ONLY-------------------------------- */
    return {
      from: account || this.props.user.address,
      to: escrow,
      data: '',
      value: web3.utils.toWei('0.01', 'ether'), //need to slightly round up ppt* total carbon to prevent not enough value error
    }
/*-----------------------------------------------------------------------*/
  }

  deployC3 = transaction => {
      console.log('need to deploy -> ', transaction);

/*-------------------------UPORT ONLY - BORKEN -------------------------------
      web3.eth.sendTransaction(transaction, (err, res)=>{
        console.log('err',err);
        console.log('res',res);
      })
-----------------------------------------------------------------------*/

/* --------------------------WORKS - METAMASK--------------------------------*/
      window.web3.eth.sendTransaction(transaction, (error, res) => {
        if (error){
          this.setState({
            metaMaskFailure: true,
            loading: {
              active: true,
              type: 'Failed to Connect to Meta Mask.'
            }
          })
        }
        else {
          console.log('res->',res);
        }
      })
/*-----------------------------------------------------------------------*/

  }

  buildC3Object = () => {
    // const BN = web3.utils.BN;
    //possible redundancies in storing BOTH ra_id and lat_lng, either one can be used to lookup geometry again
    //lat_lng being more flexible, ra_id tying up completely to reportall
    return {
      geometryHash: web3.utils.soliditySha3(this.props.c3.property.geom_as_wkt), //hash of the property's multipolygon shape (ESRI LAT/LNG PAIRS)
      //INT IN WEI
      raId: this.props.c3.property.rausa_id, //reportall lookup
      // PAIR OF INTS IN WEI
      // location: {
        latitude: web3.utils.toWei(this.props.c3.property.latitude.toString()),
        longitude: web3.utils.toWei(this.props.c3.property.longitude.toString()),
      // },
      // BigNumber
      hectares: web3.utils.toWei((convert.acresToSquareMeters(calculateActualLandArea(this.props.c3.property.acreage_calc, this.props.c3.property.bldg_sqft))/10000).toString()), //area in hectares
      //4 STRINGS
      // owner: {
        // firstname: this.props.c3.owner.firstname, //set by uPort, overwritten by property form
        // lastname: this.props.c3.owner.lastname, //set by uPort, overwritten by property form
        address: this.props.c3.owner.address, //set by uPort, overwritten by MetaMask in submit process
        // did: this.props.user.did //set by uPort, NOT STORED IN REDUX C3 because we do not ever want to overwrite this
      // },
      //STRING
      description: this.props.c3.description, //ELU code
      //INT IN WEI
      //price_per_ton: this.props.c3.ppt, //price in ETH per ton TODO:check against set exchange rate, make sure not lower in contract for deposit
      //3 INT IN WEI
      // carbon: {
        aboveGroundCarbon: web3.utils.toWei(this.props.c3.carbon.aboveGround.toString()),
        belowGroundCarbon: web3.utils.toWei(this.props.c3.carbon.belowGround.toString()),
        totalCarbon: web3.utils.toWei(this.props.c3.carbon.total.toString()),
      // }
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
            </div>
          : null
        }
      </div>
    )
  }
}

const SubmitWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(Submit))

export default SubmitWrapper
