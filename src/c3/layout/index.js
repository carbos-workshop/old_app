import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";

//steps
import FindProperty from './steps/findProperty.js'
import ConfirmProperty from './steps/confirmProperty.js'

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
});

function getSteps() {
  return [
    'Find Your Property',
    'Confirm Your Address',
    'Estimate Carbon Levels',
    'Terms and Conditions',
    'Submit Deposit',
    'Done!'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (<FindProperty />)
    case 1:
      return (<ConfirmProperty/>)
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    case 3:
      return
    case 4:
      return
    case 5:
      return
    default:
      return 'Unknown step';
  }
}

const mapStateToProps = state => {
  return {
    c3: state.c3,
  };
};

class C3ProcessForm extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
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
        return true //property shape & details are confirmed and in redux store
      default:
        return false
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={this.validateStep(this.state.activeStep)}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
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
      </div>
    );
  }
}

C3ProcessForm.propTypes = {
  classes: PropTypes.object,
};

export default connect(mapStateToProps)(withStyles(styles)(C3ProcessForm));
