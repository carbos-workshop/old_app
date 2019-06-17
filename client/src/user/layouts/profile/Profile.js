import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {

  },
  header: {
    marginBottom: theme.spacing.unit * 4
  },
  profileItem: {
    margin: theme.spacing.unit * 2
  }
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
        <Typography variant="body1" className={classes.profileItem}>
          Additional configuration options and changes you make in uPort will be reflected here.
        </Typography>
        <Typography variant="body1" className={classes.profileItem}>
          Name: {this.props.authData.name}
        </Typography>
        <Typography variant="body1" className={classes.profileItem}>
          Location: {this.props.authData.country}
        </Typography>
        <Typography variant="body1" className={classes.profileItem}>
          Identity: {this.props.authData.did.split(':')[2]}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
