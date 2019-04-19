import React, { Component } from 'react';
import './App.css';
import FormReportType from './components/formreporttype';

class App extends Component {
  render() {
    return (
      <main className="container">
        {/* <div className="App"> */}
        <FormReportType />
        {/* </div> */}
      </main>
    );
  }
}

export default App;
