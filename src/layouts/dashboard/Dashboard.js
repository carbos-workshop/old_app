import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {

  },
  header: {
    marginBottom: theme.spacing.unit * 2
  },
});

class Dashboard extends Component {
  // constructor(props, { authData }) {
  //   super(props)
  //   authData = this.props
  // }


  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography className={classes.header} variant="h4">
          Dashboard
        </Typography>
        <Typography variant="body1">
          This is your Carbos Dashboard.  Carbos Contracts you are associated with will appear here.
        </Typography>
        <Typography variant="body1">
          This feature is currently under development.
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
