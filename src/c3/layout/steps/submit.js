import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  createTransactionObject,
} from '../../../util/utils'
import { uport } from '../../../util/connectors'

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  explaination: {
    margin: theme.spacing.unit
  },
})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  return {
    c3: state.c3
  }
}

class Submit extends React.Component{

  state = {
    loading: {
      active: true,
      type: 'Submitting Transaction...'
    }
  }

  componentDidMount(){

    let txObj = {
        // from: 'did:ethr:0x60ffc1a9ed87bd44cd5c1bf43b16e7a7a70c0de9',
        to: '0x7bb53B80ccA74eEC085c93995Fb72a7057bb53aa',//'0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347',
        value: web3.utils.toWei('1', 'ether'),
        net: '0x4',
        appName: 'Carbos'
    }

    uport.sendTransaction(txObj,'test-transaction')
    uport.onResponse('test-transaction').then(res => {
     console.log(res);
    })


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
                <LinearProgress />
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
