import React from 'react';
import './App.css';
import withFormik from './components/withFormik';
import DisplayFormikState from './components/helper';
import checkEnvironment from './utilities/returnEnvironmentItems';
import { Router } from './Routing';

function App(props) {
	var Domain = checkEnvironment();
	return (
		<main>
			<Router {...props} />
			{/* This is used for debugging purposes.  */}
			{ Domain === "localhost:3000" ?  <DisplayFormikState {...props} /> : null}
		</main>

	);
}
//export default App;
export default withFormik(App)
