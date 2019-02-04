import React from 'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import ContractDetailCard from '../../../components/contractDetailCard'
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
  disclaimer: {

  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class Submission extends React.Component{

  state = {
    loading: {
      active: false,
      type: 'Building Contract...'
    },
    nameMismatch: null
  }

  componentWillMount(){
    console.log(this.props.c3);
    console.log(this.props.user)
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
              <div className={classes.disclaimer}>
                <Typography className={classes.explaination} variant="subtitle1">
                  Here are your contract details:
                </Typography>
                <ContractDetailCard c3={this.props.c3}/>
              </div>
            </div>
        }
      </div>
    )
  }
}

const SubmissionWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Submission))

export default SubmissionWrapper
