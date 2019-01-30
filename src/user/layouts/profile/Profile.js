import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100px',
    width: '100%',
    background: 'aqua',
  },
});

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
          Profile
        </Typography>
        <Typography variant="body">
          Change these details in UPort to see them reflected here.
          Name: {this.props.authData.name}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
