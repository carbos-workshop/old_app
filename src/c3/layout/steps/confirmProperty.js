import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux'
import {

} from '../../c3Actions'
import {
  getParcelByOwnerName,
  getParcelByAddress
} from '../../requests'

const styles = theme => ({
  root: {

  },
  loadingRoot: {

  },
  loadedRoot:{

  },
  explaination: {
    margin: theme.spacing.unit,
  },
  helplink:{
    color: theme.palette.primary.light,
    fontWeight: '700'
  },
});

const mapStateToProps = (state, ownProps) => {

  // ******************* TEMP (while circumventing uPort login) *******************
  let tempUser
  if (!state.user.data) {
    tempUser = { data: { name: 'BACKDOOR USER' } }
  } else {
    tempUser = state.user
  }
  //********************************* END TEMP *************************************

  return {
    c3: state.c3,
    user: tempUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onOwnerFirstnameUpdate: name => {
    //   dispatch(updateC3OwnerFirstname(name))
    // },
    // onOwnerLastnameUpdate: name => {
    //   dispatch(updateC3OwnerLastname(name))
    // },
    // onPostalAddressUpdate: address => {
    //   dispatch(updateC3PostalAddress(address))
    // }
  }
}

class ConfirmProperty extends React.Component {

  state = {
    loading: true,
  }

  componentWillMount(){
    getParcelByAddress(this.props.c3.postalAddress.street, (`${this.props.c3.postalAddress.county}, ${this.props.c3.postalAddress.state}`))
      .then( res => {
        console.log('Returned by Parcel Address Query ->', res.data.results);
        if (res.data.results.length === 1){
          this.setState({
            property: res.data.results[0],
            loading: false,
          })
        }
        else {
          console.log('Too many or too few Parcels returned by query.  Should be handled by same UI Event.')
          this.setState({
            properties: res.data.results,
            loading: false,
          })
        }
      })
      .catch( error => {
        console.log(error);
      })
  }

  componentWillUnount(){
    this.setState({
      loading:true,
      properties: [],
      property: null
    })
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        {
          this.state.loading
          ?
          <div className={classes.loadingRoot}>
            <Typography className={classes.explaination} variant="subtitle1">
              Searching Properties...
            </Typography>
            <LinearProgress />
          </div>
          :
            (!this.state.property /* Too many properties returned from query, single return option not set.  */
            ?
            <div className={classes.loadedRoot}>
              {
                this.state.properties.length > 0
                ?
                <Typography className={classes.explaination} variant="body1">
                  Oops! We found multiple properties that match the information you gave us. Please select the correct one.
                </Typography>
                :
                <Typography className={classes.explaination} variant="body1">
                  Oh no! We didn't find any properties that match the information you gave us.  Please check your information and try again.
                  If you continue to encounter problems, please reach out to <a className={classes.helplink} href="mailto:help@carbos.co">help@carbos.co</a>
                </Typography>
              }
            </div>
            :
            <div className={classes.loadedRoot}>
              <Typography className={classes.explaination} variant="body1">
                Please confirm that this property boundary is accurate and that you {`, ${this.props.user.data.name},`} are the owner.
              </Typography>
            </div>)

        }
      </div>

    )
  }
}

const ConfirmPropertyWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(ConfirmProperty))

export default ConfirmPropertyWrapper;
