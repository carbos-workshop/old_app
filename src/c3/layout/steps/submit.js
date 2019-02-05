import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      type: 'Submitting Deposit...'
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
