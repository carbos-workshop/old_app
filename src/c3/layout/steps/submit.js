import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Button from '@material-ui/core/Button';
// import {
//   createTransactionObject,
// } from '../../../util/utils'
import { connectToMetaMask, web3 } from '../../../util/connectors'

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

  componentWillMount(){
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
        this.deployC3(this.buildC3Transaction(res[0]))
      } else {console.log('There was a problem connecting to Meta Mask')}
    })
  }

  buildC3Transaction = wallet => {
    return {
      from: wallet,
      to: '0x0',
      value: web3.utils.toWei('1', 'gwei'),
    }
  }
  
  deployC3 = transaction => {
      console.log('need to deploy -> ', transaction);
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
