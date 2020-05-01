import React from "react";
import { Fieldset } from "@baltimorecounty/dotgov-components";
import _ from "lodash";

const selectTab = (currentTab, tabList) => {
  const selectTabValue = _.filter(tabList, { key: currentTab });
  return selectTabValue;
};

const FormContainer = (props) => {
  const { title = "" } = props;
  const tabList = [
    {
      description: props.tabNames.Tab1,
      id: 0,
      key: "ServiceRequestForm",
      shouldDisableForm: false,
      isPanelRequired: true,
    },
    {
      description: props.tabNames.Tab2,
      id: 1,
      key: "ProvideDetails",
      shouldDisableForm: props.shouldDisableForm,
      isPanelRequired: true,
    },
    {
      description: props.tabNames.Tab3,
      id: 2,
      key: "AdditionalInformation",
      shouldDisableForm: props.shouldDisableForm,
      isPanelRequired: props.isPanelRequired,
    },
    {
      description: props.tabNames.Tab4,
      id: 3,
      key: "Blank",
      shouldDisableForm: false,
      isPanelRequired: true,
    },
  ]
    .filter((item) => item.shouldDisableForm === false)
    .filter((item) => item.isPanelRequired);

  const selectTabValue = selectTab(props.currentTab, tabList);

  const selectClassName = (tab) => {
    if (props.shouldDisableForm) {
      return "highlight";
    } else if (!props.isPanelRequired) {
      return tab.id <= (selectTabValue[0].id === 1 ? 3 : selectTabValue[0].id)
        ? "highlight"
        : "";
    } else {
      return tab.id <= (selectTabValue[0].id === 2 ? 3 : selectTabValue[0].id)
        ? "highlight"
        : "";
    }
  };

  return (
    <div className="bc-citysourced-reporter">
      <ol className="bc-citysourced-reporter-steps">
        {tabList.map((tab, id) => {
          return props.tabNames !== "none" ? (
            <li key={tab.id} className={selectClassName(tab)}>
              {tab.description}
            </li>
          ) : null;
        })}
      </ol>
      <Fieldset title={title}>{props.children}</Fieldset>
    </div>
  );
};

export default FormContainer;
