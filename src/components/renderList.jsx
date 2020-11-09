import React from "react";
import Autocomplete from "react-autocomplete";
import _ from "lodash";
const RenderList = ({
  dataList,
  selectedAddress,
  handleChange,
  resetState,
}) => {
  const items =
    dataList.length > 0
      ? dataList.map((item, index) => ({
          id: item.Latitude,
          label: `${item.StreetAddress},${item.City},${item.Zip}`,
        }))
      : [];

  return (
    <div>
      <div className="form-group">
        <div className="inner-render">
          <Autocomplete
            getItemValue={(item) => item.label}
            items={items}
            renderItem={(item, isHighlighted) => (
              <div key={_.uniqueId()} className="form-control">
                {item.label}
              </div>
            )}
            value={selectedAddress}
            onChange={(e) => handleChange(e.target.value)}
            onSelect={(value) => resetState(value)}
          />
        </div>
      </div>
    </div>
  );
};
export default RenderList;
