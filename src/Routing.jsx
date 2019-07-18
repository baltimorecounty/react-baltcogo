import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import ServiceRequestForm from './components/ServiceRequestForm';
import AdditionalInformationForm from './components/AdditionalInformation';
import SignInForm from './components/SignInForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ProvideDetails from './components/ProvideDetails';
import GetReport from './components/GetReport';
import SubmitResponsePage from './components/SubmitResponsePage';

const Routes = {
	AdditionalInformation: '/AdditionalInformationForm',
	GetReport: '/GetReport',
	ProvideDetails: '/ProvideDetails',
	ResetPassword: '/ResetPassword',
	Root: '/',
	SignIn: '/SignInForm',
	SignUp: '/SignUpForm',
	SubmitForm: '/SubmitResponsePage'
};

const Router = (props) => (
	<Switch>
		<Route path={Routes.SignIn} render={(routeProps) => <SignInForm {...routeProps} {...props} />} />
		<Route path={Routes.SignUp} render={(routeProps) => <SignUpForm {...routeProps} {...props} />} />
		<Route path={Routes.ResetPassword} render={(routeProps) => <ResetPasswordForm {...routeProps} {...props} />} />
		<Route path={Routes.SubmitForm} render={(routeProps) => <SubmitResponsePage {...routeProps} {...props} />} />
		<Route path={Routes.AdditionalInformation} component={AdditionalInformationForm} />
		<Route path={Routes.ProvideDetails} component={ProvideDetails} />
		<Route path={Routes.GetReport} component={GetReport} />
		<Route path={Routes.Root} component={ServiceRequestForm} />
	</Switch>
);

export { Routes, Router };
