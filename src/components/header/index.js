import React from 'react';
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    // flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  homelink: {
    color: 'white',
    fontFamily: 'RegencieLight',
  },
  linkWrapper: {
    // marginRight: '5em',
  },
  button: {
    color: '#fff',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
})

class Header extends React.Component {

  render() {
    const { classes } = this.props;

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <span className={classes.linkWrapper}>
          <Link to="/dashboard">
            <Button className={classes.button} variant="text">Dashboard</Button>
          </Link>
          <Link to="/profile">
            <Button className={classes.button} variant="text">Profile</Button>
          </Link>
        </span>
        <LogoutButtonContainer />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <LoginButtonContainer />
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className={classes.grow}>
              <Typography variant="h4" color="inherit" className={classes.homelink}>
                carbos
              </Typography>
            </Link>
            <span className={classes.linkWrapper}>
              <Link to="/demo">
                <Button className={classes.button} variant="text">View Demo</Button>
              </Link>
            </span>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
