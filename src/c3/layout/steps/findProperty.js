import React from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux'
// import C3ProcessForm from '../layout'
import {
  updateC3OwnerFirstname,
  updateC3OwnerLastname,
  updateC3PostalAddress
} from '../../c3Actions'


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

const mapStateToProps = (state, ownProps) => {
  return {
    c3: state.c3,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOwnerFirstnameUpdate: name => {
      dispatch(updateC3OwnerFirstname(name))
    },
    onOwnerLastnameUpdate: name => {
      dispatch(updateC3OwnerLastname(name))
    },
    onPostalAddressUpdate: address => {
      dispatch(updateC3PostalAddress(address))
    }
  }
}

class FindProperty extends React.Component {

  handleChange = name => e => {
    switch(name) {
      case 'firstname':
        return this.props.onOwnerFirstnameUpdate(e.target.value)
      case 'lastname':
        return this.props.onOwnerLastnameUpdate(e.target.value)
      case 'address':
        return this.props.onPostalAddressUpdate(e.target.value)
      default:
        return
    }
  };

  componentWillMount(){
    if (this.props.user.data){
      console.log('found user ->', this.props.user.data.name.split(' '));
      if (this.props.user.data.name.split(' ').length > 1){
        this.props.onOwnerFirstnameUpdate(this.props.user.data.name.split(' ')[0])
        this.props.onOwnerLastnameUpdate(this.props.user.data.name.split(' ')[1])
      }
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.nameWrapper}>
          <TextField
            label="First Name"
            className={classes.textField}
            value={this.props.c3.owner.firstname}
            onChange={this.handleChange('firstname')}
            variant="outlined"
          />
          <TextField
            label="Last Name"
            className={classes.textField}
            value={this.props.c3.owner.lastname}
            onChange={this.handleChange('lastname')}
            variant="outlined"
          />
        </div>
        <TextField
          label="Address"
          className={classes.textField}
          onChange={this.handleChange('address')}
          variant="outlined"
        />
        <Typography className={classes.explaination} variant="body1">
          We'll use this information to search for a valid address.
        </Typography>
      </div>

    )
  }
}

const FindPropertyWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(FindProperty))

export default FindPropertyWrapper
