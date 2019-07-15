import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';
import ResetPassword from './components/ResetPassword';
import withFormik from './components/withFormik';
import DisplayFormikState from './components/helper';
import ProvideDetails from './components/ProvideDetails';
import GetReport from './components/GetReport';
import SubmitResponsePage from './components/SubmitResponsePage';
import checkEnvironment from './components/returnEnvironmentItems'

function App(props) {
	var Domain = checkEnvironment();
	return (

		<main className="container" >
			<Switch>
				<Route path='/SignInForm'
					render={(routeProps) => <SignInForm {...routeProps}{...props} />} />
				<Route path='/SignUpForm'
					render={(routeProps) => <SignUpForm {...routeProps}{...props} />} />
				<Route path='/ResetPassword' 
					render={(routeProps) => <ResetPassword {...routeProps}{...props} />} />
				<Route path='/SubmitResponsePage' 
					 render={(routeProps) => <SubmitResponsePage {...routeProps}{...props} />} />
				<Route path='/AdditionalInformationForm' component={AdditionalInformationForm} />
				<Route path='/ProvideDetails' component={ProvideDetails} />
				<Route path='/GetReport' component={GetReport} />
				
				<Route path='/' component={ServiceRequestForm} />
			</Switch>
			{/* This is used for debugging purposes.  */}
			{ Domain === "localhost:3000" ?  <DisplayFormikState {...props} /> : null}
		</main>

	);
}
//export default App;
export default withFormik(App)
