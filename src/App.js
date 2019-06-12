import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUpForm from './components/SignUpForm1';
import ServiceRequestForm from './components/ServiceRequestForm1';
import AdditionalInformationForm from './components/AdditionalInformation1';
import SignInForm from './components/SignInForm1';
import ResetPassword from './components/ResetPassword';
import withFormik from './components/withFormik';
import DisplayFormikState from './components/helper';
import ProviderDetails from './components/ProviderDetails';
import GetReport from './components/GetReport';
import SubmitButton from './components/SubmitButton'


//class App extends Component {
function App(props) {

	//console.log(this.props.requestType);
	// const FormContext = React.createContext();
	return (

		<main className="container" >


			<Switch>

				<Route path='/SignInForm' component={SignInForm} />
				<Route path='/SignUpForm' component={SignUpForm} />
				<Route path='/AdditionalInformationForm' component={AdditionalInformationForm} />
				<Route path='/ResetPassword' component={ResetPassword} />
				<Route path='/ProviderDetails' component={ProviderDetails} />
				<Route path='/GetReport' component={GetReport} />
				<Route path='/' component={ServiceRequestForm} />


			</Switch>

			<DisplayFormikState {...props} />
		</main>

	);
}
export default withFormik(App)
