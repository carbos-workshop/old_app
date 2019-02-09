import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux'
import {
  encounteredC3ApiError
} from '../../c3/c3Actions'
import C3 from '../../c3/layout'

const styles = theme => ({
  root: {

  },
  flexUp: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
});

const mapStateToProps = (state) => {
  return {
    c3: state.c3,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissC3ApiError: status => {
      dispatch(encounteredC3ApiError(status))
    },
  }
}

class Demo extends Component {

  state = {
     error: this.props.c3.apiError,
   };

   handleCloseError = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
     this.props.dismissC3ApiError(false)
   };

  render() {
    const { classes } = this.props
    return(
      <div className={classNames([
          classes.root,
          classes.flexUp])}>
        <Typography className={classes.title} variant="h4">
          Carbon Conservation Contract
        </Typography>
        <C3 />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.c3.apiError}
          autoHideDuration={10000}
          onClose={this.handleCloseError}
          message={`External API Error. Try disabling adblockers on this site. We don't have ads, anyway.`}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleCloseError}>
              Got It
            </Button>
          ]}
        />
      </div>
    )
  }
}

const DemoWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(Demo))

export default DemoWrapper
