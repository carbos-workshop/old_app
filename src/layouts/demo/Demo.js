import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'

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

class Demo extends Component {
  // constructor(props, { authData }) {
  //   super(props)
  //   authData = this.props
  // }

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
      </div>
    )
  }
}

export default withStyles(styles)(Demo)
