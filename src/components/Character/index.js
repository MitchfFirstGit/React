import React from "react";
import "./style.scss";
export const Character = props => {
  return (
    <figure className="character-item">
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} />
      <figcaption>
        <p>
          Status: {props.status} <br />
          Species: {props.species} <br />
          Gender: {props.gender}
        </p>
      </figcaption>
    </figure>
  );
};
