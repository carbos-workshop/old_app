import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100px',
    width: '100%',
    background: 'tomato',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography variant="h2">
          HOME
          - need to login to use App
          - description of app
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
