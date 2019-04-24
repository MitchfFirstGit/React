import React from "react";
import "./style.scss";
export const Page = props => {
  return (
    <button value={props.value} className="page">
      {props.page}
    </button>
  );
};
