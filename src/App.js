import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';
import { DisplayFormikState } from './components/helper';
import withFormik from "./components/withFormik";

//class App extends Component {
class  App extends Component {
	render(){
		console.log('----In App-----');
		console.log(this.props.requestType);
	const FormContext = React.createContext();
	return (

		<main className="container" >
			<FormContext.Provider value={{}}>
				<form >
					<Switch>
						<Route path='/SignInForm' component={SignInForm} />
						<Route path='/SignUpForm' component={SignUpForm} />
						<Route path='/AdditionalInformationForm' component={AdditionalInformationForm} />
						<Route path='/' component={ServiceRequestForm} />
					</Switch>
					<button type='submit'>Submit</button>
				</form>
			</FormContext.Provider>
			<DisplayFormikState {...this.props} />
		</main>

	);
}
}
export default App
