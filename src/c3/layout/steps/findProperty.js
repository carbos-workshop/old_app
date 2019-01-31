import React from 'react';
import ReactDOM from 'react-dom';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from 'react-redux'
// import C3ProcessForm from '../layout'
import {
  updateC3OwnerFirstname,
  updateC3OwnerLastname,
  updateC3PostalAddressStreet,
  updateC3PostalAddressState,
  updateC3PostalAddressCounty,
  updateC3PostalAddressZip,
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
    minWidth: 120,
  },
  textFieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina ','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
'South Dakota ','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

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
    onPostalAddressStreetUpdate: address => {
      dispatch(updateC3PostalAddressStreet(address))
    },
    onPostalAddressCountyUpdate: county => {
      dispatch(updateC3PostalAddressCounty(county))
    },
    onPostalAddressZipUpdate: zip => {
      dispatch(updateC3PostalAddressZip(zip))
    },
    onPostalAddressStateUpdate: state => {
      dispatch(updateC3PostalAddressState(state))
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
      case 'street':
        return this.props.onPostalAddressStreetUpdate(e.target.value)
      case 'city':
        return this.props.onPostalAddressCountyUpdate(e.target.value)
      case 'zip':
        return this.props.onPostalAddressZipUpdate(e.target.value)
      case 'state':
        return this.props.onPostalAddressStateUpdate(e.target.value)
      default:
        return
    }
  };


  componentWillMount(){
    //attempt to set initial firstname and lastname fields based on uPort name
    if (this.props.user.data){
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
        <div className={classes.textFieldWrapper}>
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
            label="Street Address"
            className={classes.textField}
            onChange={this.handleChange('street')}
            value={this.props.c3.postalAddress.street}
            variant="outlined"
          />
        <div className={classes.textFieldWrapper}>
          <TextField
            label="County"
            className={classes.textField}
            onChange={this.handleChange('county')}
            value={this.props.c3.postalAddress.county}
            variant="outlined"
          />
          <div>
            <TextField
              label="Zip Code"
              className={classes.textField}
              onChange={this.handleChange('zip')}
              error={/[^0-9]/.test(this.props.c3.postalAddress.zip)}
              value={this.props.c3.postalAddress.zip}
              variant="outlined"
            />

            <TextField
              select
              label="State"
              className={classes.textField}
              value={this.props.c3.postalAddress.state}
              onChange={this.handleChange('state')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {states.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <Typography className={classes.explaination} variant="body1">
          We'll use this information to search for a valid legal address.
        </Typography>
      </div>

    )
  }
}

const FindPropertyWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(FindProperty))

export default FindPropertyWrapper
