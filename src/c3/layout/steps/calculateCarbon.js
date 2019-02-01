import React from  'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {
  getSoilCarbon,
  getEcologicalLandUnits,
  getBiomass
} from '../../requests'

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

  }
})

class CalculateCarbon extends React.Component{

  componentWillMount(){

    getSoilCarbon(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        console.log('carbon', res.data)
      })
    getEcologicalLandUnits(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        console.log('ELU', res.data)
      })
    getBiomass(this.props.c3.property.latitude, this.props.c3.property.longitude)
      .then(res => {
        console.log('biomass', res.data)
      })
  }

  render(){
    const { classes } = this.props
    return(
      <div className={classes.root}>

      </div>
    )
  }
}

const CalculateCarbonWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalculateCarbon))

export default CalculateCarbonWrapper
