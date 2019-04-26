import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({

    root: {
        width: '90%',
    }
});

function getSteps() {
    return ['Choose a Report Type', 'Enter a Location', 'Provide Your Contact Information'];
}


class HorizontalNonLinearStepper extends React.Component {

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.props;
        return (
            <div className={classes.root}>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

            </div>
        );
    }
}


export default withStyles(styles)(HorizontalNonLinearStepper);
