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
  var configItem = "";

  if (domain === "dev.baltimorecountymd.gov") {
    configItem = _.filter(configItems[configItemName + "Test"], { key: item });
  } else if (domain === "staging.baltimorecountymd.gov") {
    configItem = _.filter(configItems[configItemName + "Stage"], { key: item });
  } else if (domain === "www.baltimorecountymd.gov") {
    configItem = _.filter(configItems[configItemName + "Prod"], { key: item });
  } else {
    configItem = _.filter(configItems[configItemName + "Local"], { key: item });
  }
  return configItem[0].value;
};

export default checkEnvironment;
