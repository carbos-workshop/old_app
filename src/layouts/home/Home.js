import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {

  },
});

class Home extends Component {
  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography variant="h2">
          Carbos
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">need to login to use App</Typography>
          </li>
          <li>
            <Typography variant="body1">description of app</Typography>
          </li>
          <li>
            <Typography variant="body1">graphics</Typography>
          </li>
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
