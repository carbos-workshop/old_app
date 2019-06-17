import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connectToMetaMask } from '../../util/connectors' // { uport }
import Web3 from 'web3'
import GAIA from '../../abis/Gaia.json'
import C3 from '../../components/C3'

const styles = theme => ({
  root: {

  },
  header: {
    marginBottom: theme.spacing.unit * 2
  },
  address: {
    color: theme.palette.primary.main
  }
});

class Dashboard extends Component {
  state = {
    c3s: []
  }

  componentDidMount(){
    connectToMetaMask()
      .then(res => {
        if (res[0]){
          this.getUserC3s(res[0])
            .then( res => {
              this.setState({
                c3s: res,
                address: res[0]
              })
            })
        }
      })
  }

  getUserC3s = async(userAddress) => {
    let web3 = new Web3(window.web3.currentProvider)
    let gaia = new web3.eth.Contract(GAIA.abi, GAIA.networks[4].address)
    let c3s = await gaia.methods.getUsersC3(userAddress).call()
    return c3s
  }


  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography className={classes.header} variant="h4">
          Dashboard
        </Typography>
        <Typography variant="body1" className={classes.header}>
          Here are deployed Carbon Contracts associated with <span className={classes.address}>{this.state.address}</span>
        </Typography>
        {
          this.state.c3s.map( address => (
            <C3 key={address} address={address}/>
          ))
        }
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
