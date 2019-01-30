import React from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

  },
  explaination: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexGrow: '1',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
  nameWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class FindProperty extends React.Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  handleChange = name => event => {
    // this.setState({
    //   [name]: event.target.value,
    // });
  };

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.nameWrapper}>
          <TextField
            label="First Name"
            className={classes.textField}
            value={''}
            onChange={this.handleChange('firstName')}
            variant="outlined"
          />
          <TextField
            label="Last Name"
            className={classes.textField}
            value={''}
            onChange={this.handleChange('lastName')}
            variant="outlined"
          />
        </div>
        <TextField
          label="Address"
          className={classes.textField}
          value={''}
          onChange={this.handleChange('address')}
          variant="outlined"
        />
        <Typography className={classes.explaination} variant="body1">
          We'll use this information to search tax records for legally registered properties.
        </Typography>
      </div>

    )
  }
}

export default withStyles(styles)(FindProperty);
