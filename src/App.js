import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';
import ResetPassword from './components/ResetPassword';
import withFormik from './components/withFormik';
// import DisplayFormikState from './components/helper';
import ProviderDetails from './components/ProviderDetails';
import GetReport from './components/GetReport';

function App(props) {

	return (

		<main className="container" >


			<Switch>

				<Route path='/SignInForm'
					render={(routeProps) => <SignInForm {...routeProps}{...props} />} />
				<Route path='/SignUpForm'
					render={(routeProps) => <SignUpForm {...routeProps}{...props} />} />

				<Route path='/AdditionalInformationForm' component={AdditionalInformationForm} />
				<Route path='/ResetPassword' component={ResetPassword} />
				<Route path='/ProviderDetails' component={ProviderDetails} />
				<Route path='/GetReport' component={GetReport} />
				<Route path='/' component={ServiceRequestForm} />


			</Switch>

			{/* <DisplayFormikState {...props} /> */}
		</main>

	);
}
//export default App;
export default withFormik(App)
