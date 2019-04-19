import React, { Component } from 'react';
import './App.css';
// import FormReportType from './components/formreporttype';
import FormContact from './components/formcontact';
class App extends Component {
  render() {
    return (
      <main className="container">
        {/* <div className="App"> */}
        {/* <FormReportType /> */}
        <FormContact />
        {/* </div> */}
      </main>
    );
  }
}

export default App;
