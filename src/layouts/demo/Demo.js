import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100px',
    width: '100%',
    background: 'sand',
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
      <div className={classes.root}>
        <Typography variant="h2">
          Demo
        </Typography>
        <Typography variant="body">
          Demo
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Demo)
