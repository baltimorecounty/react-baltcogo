import * as configItems from "./config";
import _ from "lodash";

export const checkEnvironment = () => {
  const environment = window.location.href;
  var urlParts = environment
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/);
  return urlParts[0];
};

export const returnConfigItems = (configItemName, item) => {
  var domain = checkEnvironment();
  var configSuffix = "Local";

  if (domain === "dev.baltimorecountymd.gov") {
    configSuffix = "Test";
  } else if (domain === "staging.baltimorecountymd.gov") {
    configSuffix = "Stage";
  } else if (domain === "beta.baltimorecountymd.gov") {
    configSuffix = "Beta";
  } else if (domain === "www.baltimorecountymd.gov") {
    configSuffix = "Prod";
  } else {
    configSuffix = "Local";
  }

  return _.filter(configItems[configItemName + configSuffix], { key: item })[0]
    .value;
};

export default checkEnvironment;
