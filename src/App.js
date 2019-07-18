import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import withFormik from './components/withFormik';
import DisplayFormikState from './components/helper';
import ProvideDetails from './components/ProvideDetails';
import GetReport from './components/GetReport';
import SubmitResponsePage from './components/SubmitResponsePage';
import checkEnvironment from './utilities/returnEnvironmentItems';
import { Routes } from './Routing';

function App(props) {
	var Domain = checkEnvironment();
	return (

		<main className="container" >
			<Switch>
				<Route path={Routes.SignIn}
					render={(routeProps) => <SignInForm {...routeProps}{...props} />} />
				<Route path={Routes.SignUp}
					render={(routeProps) => <SignUpForm {...routeProps}{...props} />} />
				<Route path={Routes.ResetPassword}
					render={(routeProps) => <ResetPasswordForm {...routeProps}{...props} />} />
				<Route path={Routes.SubmitForm}
					 render={(routeProps) => <SubmitResponsePage {...routeProps}{...props} />} />
				<Route path={Routes.AdditionalInformation} component={AdditionalInformationForm} />
				<Route path={Routes.ProvideDetails} component={ProvideDetails} />
				<Route path={Routes.GetReport} component={GetReport} />
				<Route path={Routes.Root} component={ServiceRequestForm} />
			</Switch>
			{/* This is used for debugging purposes.  */}
			{ Domain === "localhost:3000" ?  <DisplayFormikState {...props} /> : null}
		</main>

	);
}
//export default App;
export default withFormik(App)
