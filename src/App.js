import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';

//class App extends Component {
function App() {

	return (

		<main className="container" >
			<Switch>
				<Route path='/SignInForm' component={SignInForm} />
				<Route path='/SignUpForm' component={SignUpForm} />
				<Route path='/AdditionalInformationForm' component={AdditionalInformationForm} />
				<Route path='/' component={ServiceRequestForm} />
			</Switch>
		</main>

	);
}
export default App 
