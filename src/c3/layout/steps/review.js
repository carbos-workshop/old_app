import React from 'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {
  updateC3OwnerNameMismatch
} from '../../c3Actions'
import ContractConfiguration from '../../../components/contractConfiguration'
import Warning from '../../../components/warning'

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  loadedRoot:{},
  explaination: {
    margin: theme.spacing.unit,
  },
  contractWrapper: {
    marginTop: theme.spacing.unit * 2,
  },
  contract: {
    marginTop: theme.spacing.unit,
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    property: state.c3.property,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onC3OwnerNameMismatchUpdate: property => {
      dispatch(updateC3OwnerNameMismatch(property))
    },
  }
}

class Review extends React.Component{

  state = {
    loading: {
      active: false,
      type: 'Building Contract...'
    },
    nameMismatch: null
  }

  componentWillMount(){
    this.props.onC3OwnerNameMismatchUpdate(this.ownerNameMismatch())
    this.setState({
      nameMismatch: this.ownerNameMismatch()
    })
  }

  ownerNameMismatch = () => {
    if (this.props.user.data){
      let name = this.props.user.data.name.split(' ')
      if (name.length > 1) {
        return !this.props.c3.property.owner.includes(name[0]) || this.props.c3.property.owner.includes(name[1])
      }
    }
    return true
  }

  render(){
    const { classes } = this.props

    return(
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
          :
            <div className={classes.loadedRoot}>
              {
                this.state.nameMismatch
              ?
                <Warning title="Warning">
                  Your provided information does not match what we have on file for this property.
                  <br />
                  ( It's okay, you'll just have to submit some documentation later. )
                </Warning>
              :
                null
              }
              <div className={classes.contractWrapper}>
                <Typography className={classes.explaination} variant="body2">
                  Here are your contract details:
                </Typography>
                <ContractConfiguration className={classes.contract} c3={this.props.c3} property={this.props.property}/>
              </div>
            </div>
        }
      </div>
    )
  }
}

const ReviewWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Review))

export default ReviewWrapper
