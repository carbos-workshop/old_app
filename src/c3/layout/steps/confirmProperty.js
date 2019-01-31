import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
// import {
//
// } from '../../c3Actions'
import {
  getParcelByOwnerName,
  getParcelByAddress
} from '../../requests'

import LeafletMap from '../../../components/map'

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
          //separate function -> if > 0, store and move on, if = 0, search by name and move on TODO
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

  selectProperty = property => {
    this.setState({
      property: property,
      properties: []
    })
  }



  render(){
    const { classes } = this.props;

    const geometry = "MULTIPOLYGON(((-104.921298536263 39.6125972845498,-104.92130044769 39.6120259701034,-104.921992613112 39.6120376089511,-104.921992324116 39.6124785821555,-104.921991460977 39.6126050156913,-104.921298536263 39.6125972845498)))"

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
                <div>
                  <Typography className={classes.explaination} variant="body1">
                    Oops! We found multiple properties that match the information you gave us. Please select the correct one.
                  </Typography>
                  <List>
                    {
                      this.state.properties.map(property => (
                        <ListItem key={property.parcel_id} button onClick={() => {this.selectProperty(property)}}>
                          <ListItemText primary={`${property.mail_address1} ${property.mail_address3}`} secondary={`${property.owner}`} inset={true}/>
                        </ListItem>
                      ))
                    }
                  </List>
                </div>
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
              <LeafletMap geometry={geometry}/>
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
