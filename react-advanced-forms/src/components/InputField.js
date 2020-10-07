import React from "react";

export default function InputField(props) {
  switch (props.type) {
    case "checkbox":
      return (
        <label htmlFor={props.name} className="terms">
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            checked={props.value}
          />
          {props.label}
        </label>
      );

    default:
      return (
        <label htmlFor={props.name}>
          {props.label}
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            value={props.value}
          />
        </label>
      );
  }
}
