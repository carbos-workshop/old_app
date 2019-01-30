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

const styles = {
  root: {
    // flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  homelink: {
    color: 'white',
  },
  linkWrapper: {
    marginRight: '5em',
  },
  button: {
    color: '#fff',
    margin: '0 1em'
  },
};

class Header extends React.Component {

  render() {
    const { classes } = this.props;

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <span className={classes.linkWrapper}>
          <Link to="/dashboard">
            <Button className={classes.button} variant="flat">Dashboard</Button>
          </Link>
          <Link to="/profile">
            <Button className={classes.button} variant="flat">Profile</Button>
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
              <Typography variant="h6" color="inherit" className={classes.homelink}>
                Carbos Demo
              </Typography>
            </Link>
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
