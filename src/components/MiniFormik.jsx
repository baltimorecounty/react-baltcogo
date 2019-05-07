import React, { Component } from 'react';
import ContactForm from './contact';
class MiniFormik extends Component {
    state = {
    	values: this.props.initialValues || {},


    };



    render() {
    	return this.props.children({
    		...this.state,
    		PostData: this.getReportType,
    	});
    }
}

export default MiniFormik;