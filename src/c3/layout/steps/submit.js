import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Button from '@material-ui/core/Button';
// import {
//   createTransactionObject,
// } from '../../../util/utils'
import { connectToMetaMask, web3, uport } from '../../../util/connectors'

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

    this.deployC3(this.buildC3Transaction('0x0000000000000000000000000000000000000000', this.props.user.address))

  /*-------------------------WORKS - METAMASK---------------------------------
   WORKS - METAMASK
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
      this.setState({
        loading: {
          ...this.state.loading,
          type: 'Building Transaction...'
        }
      })
      this.deployC3(this.buildC3Transaction('0x0000000000000000000000000000000000000000', res[0]))
    } else {console.log('There was a problem connecting to Meta Mask')}
  })
  -----------------------------------------------------------------------*/

  }

  buildC3Transaction = (escrow,account)  => {
    console.log('sending from  -> ', account);
    console.log('sending to  -> ', escrow);

    let value = web3.utils.toWei('0.001', 'ether') //VALUE MUST BE string? IN WEI, any high number (like in eth) breaks it
    console.log(value);
    return {
      from : account,
      to: escrow,
      value: value,
      appName: 'Carbos-Local-Test',
    }

/* --------------------------WORKS - METAMASK--------------------------------
    return {
      from: account || this.props.user.address,
      to: escrow,
      data: '',
      value: web3.utils.toWei('0.5', 'ether'),
    }
-----------------------------------------------------------------------*/
  }

  deployC3 = transaction => {
      console.log('need to deploy -> ', transaction);

      web3.eth.sendTransaction(transaction, (err, res)=>{
        console.log('err',err);
        console.log('res',res);
      })

/* --------------------------WORKS - METAMASK--------------------------------
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
-----------------------------------------------------------------------*/

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
