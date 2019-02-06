import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100px',
    width: '100%',
    background: 'gold',
  },
});

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography variant="h2">
          Dashboard
        </Typography>
        <Typography variant="body1">
          -DEtials about C3s owned
          Congratulations {this.props.authData.name}! If you're seeing this page, you've logged in with UPort successfully.
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
