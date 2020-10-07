import React, { useState, useEffect } from "react";

// Import Components
import InputField from "./InputField";

// Import Dependencies
import * as yup from "yup";
import { gsap } from "gsap";

export default function Form() {
  // Set the state that will store the form data
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  // Set the state that will hold the errors, if any
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."), // must be a string or else error
    email: yup.string().email("Please enter a valid email."), // must have string present, must be of the shape of an email
    password: yup.string().required("Password is required."),
    terms: yup.boolean().oneOf([true]),
  });

  const formValidation = (e) => {
    for (const userData in user) {
      let allErrors = { ...errors };

      yup
        .reach(formSchema, userData)
        .validate(typeof user[userData] === "boolean" ? e.target.checked : e.target.value)
        .then((valid) => {
          allErrors[userData] = "";
        })
        .catch((err) => {
          console.log("err", err);
          allErrors[userData] = err.errors[0];
        });

      console.log(allErrors);

      setErrors(allErrors);
    }
  };

  // Handle state input
  const handleChange = (e) => {
    e.persist();

    // Create the new state variable
    const newUserState = {
      ...user,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    // Set the new state
    setUser(newUserState);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Stop form submission from reloading page
    e.preventDefault();

    // Check for valudation first
    // formValidation(e);

    formSchema.isValid(user).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
      } else {
        const errorAnim = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        errorAnim.to(".signup-form", { x: -50, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 50, duration: 0.2 });
        errorAnim.to(".signup-form", { x: -20, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 20, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 0, duration: 0.2 });
      }
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>User Signup</h3>

      <InputField name="name" type="text" label="Name" value={user.name} handleChange={handleChange} />

      <InputField name="email" type="text" label="Email" value={user.email} handleChange={handleChange} />

      <InputField
        name="password"
        type="password"
        label="Password"
        value={user.password}
        handleChange={handleChange}
      />

      <InputField
        name="terms"
        type="checkbox"
        label="Terms &amp; Conditions"
        value={user.terms}
        handleChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
