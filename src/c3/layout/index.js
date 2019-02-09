import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/SendTwoTone';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {connect} from "react-redux";
import {
  updateC3Property,
} from '../c3Actions'
import { calculateDeposit } from '../utils'
//steps
import FindProperty from './steps/findProperty.js'
import ConfirmProperty from './steps/confirmProperty.js'
import CalculateCarbon from './steps/calculateCarbon.js'
import Review from './steps/review.js'
import Submit from './steps/submit.js'


const styles = theme => ({
  root: {
    // width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  rightIcon:{
    marginLeft: theme.spacing.unit,
  },
  highlightedText: {
    marginLeft: '4px',
  },
  link:{
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: '700',
    '&:hover':{
      color: theme.palette.primary.light,
    },
    '&:active':{
      color: theme.palette.primary.dark,
    },
  },
  disclaimerText:{
    // marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  }
});

function getSteps() {
  return [
    'Find Your Property',
    'Confirm Your Information',
    'Generate Carbon Estimate',
    'Reivew Contract Proposal',
    'Submit'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (<FindProperty />)
    case 1:
      return (<ConfirmProperty/>)
    case 2:
      return (<CalculateCarbon/>);
    case 3:
      return (<Review />)
    case 4:
      return (<Submit />)
    default:
      return 'Unknown step';
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOwnerPropertyUpdate: property => {
      dispatch(updateC3Property(property))
    },
  }
}

const mapStateToProps = state => {
  return {
    c3: state.c3,
    user: state.user.data
  };
};

class C3ProcessForm extends React.Component {
  state = {
    activeStep: 0,
    openDisclaimer: false,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    //specific actions to be taken when traveling back to the activeStep
    if (this.state.activeStep === 1){
      this.props.onOwnerPropertyUpdate(null)
    }

    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleOpenDisclaimer = () => {
    this.setState({ openDisclaimer: true });
  };

  handleCloseDisclaimer = () => {
    this.setState({ openDisclaimer: false });
    this.handleNext()
  };

  validateStep = step => {
    switch(step){
      case 0:
        return !(Boolean(this.props.c3.owner.firstname
          && this.props.c3.owner.lastname
          && this.props.c3.postalAddress.street
          && this.props.c3.postalAddress.county
          && this.props.c3.postalAddress.zip
          && this.props.c3.postalAddress.state)) //all fields are filled in before next button enabled
      case 1:
        return !(Boolean(this.props.c3.property
          && this.props.c3.propertyConfirmation)) //property is confirmed and in redux store for use in carbon queries
      case 2:
        return !(Boolean(this.props.c3.carbon.aboveGround > 0
          && this.props.c3.carbon.belowGround > 0
          && this.props.c3.description.length > 0)) //description is a existant string and both carbon values are positive numbers
      case 3:
        return !(Boolean(this.props.c3.carbon.aboveGround > 0
          && this.props.c3.carbon.belowGround > 0
          && this.props.c3.description.length > 0
          && this.props.c3.description.length > 0
          && this.props.c3.owner.firstname
          && this.props.c3.owner.lastname
          && this.props.user.address
          && this.props.c3.property
          && this.props.c3.propertyConfirmation)) //all required c3 fields have values
      case 4:
        return !Boolean(this.props.c3.submitted)
      default:
        return false
    }
  }

  submitC3 = () => {
    this.handleOpenDisclaimer()
    console.log(this.props.c3);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    const submitContractButton = (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={this.validateStep(this.state.activeStep)}
        onClick={this.handleOpenDisclaimer}
      >
        Submit
       <SendIcon className={classes.rightIcon} />
      </Button>
    )

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant='h6'>
                  {label}
                </Typography>
              </StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {
                      this.state.activeStep === 3
                      ? submitContractButton
                      :
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={this.validateStep(this.state.activeStep)}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    }
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
        <Dialog
           open={this.state.openDisclaimer}
           onClose={()=>{this.setState({ openDisclaimer: false })}}
         >
           <DialogTitle>{"Connecting To MetaMask"}</DialogTitle>
           <DialogContent>
             <Typography className={classes.disclaimerText} variant="body2">
               Submitting a Contract requires a deposit of 5% the contract's value.
             </Typography>
             <Typography className={classes.disclaimerText} variant="body2">
               You will need <a target="_blank" rel="noopener noreferrer" className={classes.link} href="https://metamask.io/">MetaMask</a> installed and funded with at least
               <strong className={classes.highlightedText}>{calculateDeposit(this.props.c3.carbon.total, this.props.c3.ppt)} <span className="ether-sign">Ξ</span></strong> in order to continue with contract submission.
             </Typography>
             <Typography variant="body2">
               <strong>This deposit will be returned to you</strong>, minus gas costs, once the contract has been endorsed.
             </Typography>
           </DialogContent>
           <DialogActions>
             <Button onClick={this.handleCloseDisclaimer} autoFocus>
               I'm Ready!
             </Button>
           </DialogActions>
         </Dialog>
      </div>
    );
  }
}

C3ProcessForm.propTypes = {
  classes: PropTypes.object,
};

const C3ProcessFormWrapper = connect(
  mapStateToProps,
mapDispatchToProps)(withStyles(styles)(C3ProcessForm));

export default C3ProcessFormWrapper
