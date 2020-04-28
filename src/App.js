import React from "react";
import "./App.css";
//*********************************************** */
//these need to be removed before pushing to beta
import "./CSS/citysourced-reporter.min.css";
import "./CSS/inside-responsive.min.css";
//************************************************/
import withFormik from "./components/withFormik";
import DisplayFormikState from "./components/helper";
import checkEnvironment from "./utilities/returnEnvironmentItems";
import "@baltimorecounty/dotgov-components/lib/styles/dotgov.min.css";
import { Router } from "./Routing";

function App(props) {
  var Domain = checkEnvironment();
  return (
    <main>
      <Router {...props} />
      {/* This is used for debugging purposes.  */}
      {Domain === "localhost:3000" ? <DisplayFormikState {...props} /> : null}
    </main>
  );
}
//export default App;
export default withFormik(App);
