import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Icon from '@material-ui/core/Icon';
// Images
import uPortLogo from '../../../img/uport-logo.svg'

const styles = theme => ({
  root: {
    border: '1px solid white !important',
  },
  buttonText: {
    fontWeight: '700',
    marginRight: '1em',
    color: '#fff',
  },
  textHidden: {
    visibility: 'hidden',
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    height: '1em',
    width: '1em',
  },
  buttonProgress: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class LoginButton extends React.Component {
  state = {
    loading: false
  }

  handleClick = e => {
    this.props.onLoginUserClick(e)
    this.setState({
      loading: true
    })
  }

  render(){
      const { classes } = this.props;
      return(
        <div>
          <Button
            className={classes.root}
            variant="outlined"
            disabled={this.state.loading}
            onClick={(e) => this.handleClick(e)}>
            <Typography className={classNames([
                classes.buttonText,
                (this.state.loading ? classes.textHidden : null)
              ])}>
              Login
            </Typography>
            <Icon className={classes.logoWrapper}>
              {this.state.loading
                ? <CircularProgress size={24} className={classes.buttonProgress} />
                : <img className={classes.logo} src={uPortLogo} alt="UPort Logo" />

              }
            </Icon>
          </Button>
        </div>
      )
  }
}

export default withStyles(styles)(LoginButton)
