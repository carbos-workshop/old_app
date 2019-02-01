import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {
  updateC3Property,
  updateC3PropertyConfirmation,
} from '../../c3Actions'
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
  inline: {
    display: 'inline',
  },
  explaination: {
    margin: theme.spacing.unit,
  },
  confirmationWrapper:{
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
    user: tempUser,
    property: state.c3.property,
    propertyConfirmation: state.c3.propertyConfirmation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOwnerPropertyUpdate: property => {
      dispatch(updateC3Property(property))
    },
    onOwnerPropertyConfirmationUpdate: status => {
      dispatch(updateC3PropertyConfirmation(status))
    },
  }
}

class ConfirmProperty extends React.Component {

  state = {
    loading: true,
  }

  componentWillMount(){
    this.fetchParcelByAddress()
  }

  fetchParcelByAddress = () => {
    getParcelByAddress(this.props.c3.postalAddress.street, (`${this.props.c3.postalAddress.county}, ${this.props.c3.postalAddress.state}`))
      .then( res => {
        // console.log('Returned by Parcel Address Query ->', res.data.results);
        if (res.data.results.length === 1){
          this.props.onOwnerPropertyUpdate(res.data.results[0])
          this.setState({
            loading: false,
          })
        }
        else {
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


  fetchParcelByName = () => {
    this.setState({
      loading: true,
    });
    getParcelByOwnerName(this.props.c3.owner.firstname, this.props.c3.owner.lastname, this.props.c3.postalAddress.zip)
      .then( res => {
        if (res.data.results.length === 1){
          this.props.onOwnerPropertyUpdate(res.data.results[0])
          this.setState({
            loading: false,
          })
        }
        else {
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

  componentWillUnmount(){
    this.setState({
      loading:true,
      properties: [],
    })
  }

  selectProperty = property => {
    this.props.onOwnerPropertyUpdate(property)
    this.setState({
      properties: []
    })
  }

  confirmed = () => {
    this.props.onOwnerPropertyConfirmationUpdate(!this.props.propertyConfirmation)
  }


  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        {
          this.state.loading
          ?
          <div className={classes.loadingRoot}>
            <Typography className={classes.explaination} variant="body2">
              Searching Properties...
            </Typography>
            <LinearProgress />
          </div>
          :
            ((!this.props.property) /* Too many properties returned from query, single return option not set.  */
            ?
            <div className={classes.loadedRoot}>
              {
                this.state.properties.length > 0
                ?
                <div>
                  <Typography className={classes.explaination} variant="body2">
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
                  <Typography className={classNames([classes.explaination, classes.inline])} variant="body2">
                    If you don't see your property listed, we can <Button color="primary" onClick={()=>{this.fetchParcelByName()}}>Search Additional Properties</Button>
                  </Typography>
                </div>
                :
                <div className={classes.explaination}>
                  <Typography variant="body2">
                    Oh no! We didn't find any properties that match the information you gave us.  Please check the information provided and try again.
                    If you continue to encounter problems, please reach out to <a className={classes.helplink} href="mailto:help@carbos.co">help@carbos.co</a>
                  </Typography>
                  <Typography variant="body2">
                    If you believe you are seeing this message in error, we can <Button color="primary" onClick={()=>{this.fetchParcelByName()}}>Search Additional Properties</Button>
                  </Typography>
                </div>

              }
            </div>
            :
            <div className={classes.loadedRoot}>
              <LeafletMap data={this.props.property} geometry={this.props.property.geom_as_wkt} center={[this.props.property.latitude, this.props.property.longitude]}/>
              <FormControlLabel
                className={classes.confirmationWrapper}
                control={
                  <Checkbox
                    checked={this.props.propertyConfirmation}
                    onChange={() => { this.confirmed() }}
                    value="confirmed"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1">
                    I confirm that this information is accurate and that I, {`${this.props.user.data.name}`}, am the owner of this property.
                  </Typography>
                }
              />
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
