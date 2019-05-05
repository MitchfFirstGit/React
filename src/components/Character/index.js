import React from "react";
import "./style.scss";
import { Spring } from "react-spring/renderprops";
export const Character = props => {
  return (
    <Spring
      from={{ transform: "scale(0)", opacity: 0 }}
      to={{ transform: "scale(1)", opacity: 1 }}
      config={{ duration: 300, delay: 100 }}
    >
      {animation => (
        <figure className="character-item" style={animation}>
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
      )}
    </Spring>
  );
};
