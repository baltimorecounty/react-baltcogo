import React, { Component } from 'react';
import './App.css';
import ServiceRequestForm from './components/ServiceRequestForm'
//import validation from './components/validation';
//import DynamicForm from './components/dynamicForm';

class App extends Component {
	render() {
		/*    const fields = [
         {label: 'First Name', type: 'input', name: 'firstName', value: 'Abdi'},
         {label: 'Last Name', type: 'input', name: 'lastName', value: 'Ahmed'},
         {label: 'Address', type: 'input', name: 'address', value: '10 FSS Street'},
         {label: 'City', type: 'input', name: 'city', value: 'London'},
         {label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Please Select'},
       ]; */
		return (
			<main className="container">
				<ServiceRequestForm />
			</main>

		);
	}
}
{/* <DynamicForm fields={fields} validation={validation} /> */ }

export default App;
