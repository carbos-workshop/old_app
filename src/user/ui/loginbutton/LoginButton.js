import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';
// Images
import uPortLogo from '../../../img/uport-logo.svg'

const styles = theme => ({
  root: {
    border: '1px solid rgba(255,255,255.23)',
  },
  buttonText: {
    fontWeight: '700',
    marginRight: '1em',
    color: '#fff',
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    height: '1em',
    width: '1em',
  }
});

function LoginButton(props) {
  const { classes } = props;
  return(
    <Button
      className={classes.root}
      variant="outlined"
      onClick={(event) => props.onLoginUserClick(event)}>
      <Typography className={classes.buttonText}>
        Login with UPort
      </Typography>
      <Icon className={classes.logoWrapper}>
        <img className={classes.logo} src={uPortLogo} alt="UPort Logo" />
      </Icon>
    </Button>
  )
}

export default withStyles(styles)(LoginButton)
