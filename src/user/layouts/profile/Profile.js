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

//TODO move this to larger layout directory
class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography className={classes.header} variant="h4">
          Carbos Profile
        </Typography>
        <Typography variant="body1">
          Name: {this.props.authData.name}
        </Typography>
        <Typography variant="body1">
          Location: {this.props.authData.country}
        </Typography>
        <Typography variant="body1">
          uPort Wallet Address: {this.props.authData.address}
        </Typography>
        <Typography variant="body1">
          Additional configuration options for you carbos account and profile will appear here. Changes you make in uPort will be reflected here.
        </Typography>
        <Typography variant="body1">
          This feature is currently under development.
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
