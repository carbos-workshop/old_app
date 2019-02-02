import React from 'react'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  explaination: {
    margin: theme.spacing.unit,
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class Submission extends React.Component{

  state = {
    loading:  true
  }

  render(){
    const { classes } = this.props
    return(
      <div className={classes.root}>
        {
          this.state.loading
          ?
            <div className={classes.loadingRoot}>
              <div className={classes.loadingRoot}>
                <Typography className={classes.explaination} variant="body2">
                  Building Contract...
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

const SubmissionWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Submission))

export default SubmissionWrapper
