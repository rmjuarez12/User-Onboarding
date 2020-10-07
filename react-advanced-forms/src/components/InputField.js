import React from "react";

export default function InputField(props) {
  switch (props.type) {
    case "checkbox":
      return (
        <label htmlFor={props.name} className={`${props.error !== "" ? "terms invalid" : "terms valid"}`}>
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            checked={props.value}
          />
          {props.label}

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );

    default:
      return (
        <label htmlFor={props.name} className={`${props.error !== "" ? "invalid" : "valid"}`}>
          {props.label}
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            value={props.value}
          />

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );
  }
}
