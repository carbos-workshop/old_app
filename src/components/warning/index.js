import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/WarningTwoTone';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    lineHeight: '24px',
    background: theme.palette.secondary.light,
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  title: {
    flexGrow: '1'
  },
  message:{
    padding: theme.spacing.unit,
  }
})

function Warning(props){
  const {classes} = props
  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.titleWrapper}>
        <WarningIcon />
        <Typography className={classes.title} variant="h6">
          {props.title}
        </Typography>
        <WarningIcon />
      </div>
      <Typography className={classes.message} variant="body1">
        {props.children}
      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(Warning)
