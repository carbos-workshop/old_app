import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100px',
    width: '100%',
    background: 'aqua',
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
        <Typography variant="h2">
          uPort Profile
        </Typography>
        <Typography variant="body1">
          Change these details in UPort to see them reflected here.
          Name: {this.props.authData.name}
        </Typography>

      </div>
    )
  }
}

export default withStyles(styles)(Profile)
