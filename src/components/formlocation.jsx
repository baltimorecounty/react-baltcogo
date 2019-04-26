import React, { Component } from 'react'
class FormLocation extends Component {
    state = {}
    render() {
        const { nextStep, prestep } = this.props;
        return (

            <React.Fragment>
                <h1> google location </h1>
                <button
                    className="btn btn-primary"
                    onClick={prestep}>
                    "PREVIOUS"
                    </button>
                <button

                    className="btn btn-primary"
                    onClick={nextStep}>
                    "NEXT"
                    </button>

            </React.Fragment>

        );
    }
}

export default FormLocation;