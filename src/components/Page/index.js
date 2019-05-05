import React from "react";
import "./style.scss";
export const Page = props => {
  return (
    <div>
      <input
        type="radio"
        name={"page-" + props.name}
        value={props.value}
        className={"page-radio-" + props.name}
        id={"page" + props.page + props.name}
      />

      <label className="page-label" htmlFor={"page" + props.page + props.name}>
        {props.page}
      </label>
    </div>
  );
};
