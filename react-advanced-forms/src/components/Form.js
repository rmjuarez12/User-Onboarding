import React, { useState } from "react";

// Import Components
import InputField from "./InputField";

// Import Dependencies
import * as yup from "yup";
import { gsap } from "gsap";

export default function Form(props) {
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

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

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

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."), // must be a string or else error
    email: yup.string().required("Email is required").email("Please enter a valid email."), // must have string present, must be of the shape of an email
    password: yup.string().required("Password is required."),
    terms: yup.boolean().oneOf([true]),
  });

  // Form to catch any errors if the form did not validated
  const formErrors = (e) => {
    // Make a copy of the errors state
    let allErrors = { ...errors };

    // Cycle through all data and check
    for (const userData in user) {
      yup
        .reach(formSchema, userData)
        .validate(user[userData])
        .then((valid) => {
          allErrors[`${userData}`] = "";
          console.log(userData, valid);
        })
        .catch((err) => {
          allErrors[`${userData}`] = err.errors[0];
        });
    }

    // Set the errors into the state
    setErrors(allErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Stop form submission from reloading page
    e.preventDefault();

    // Check for valudation first
    formErrors();

    formSchema.isValid(user).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({
          name: "",
          email: "",
          password: "",
          terms: "",
        });

        // Clear the form
        setUser({
          name: "",
          email: "",
          password: "",
          terms: false,
        });

        // Submit the form
        props.formSubmission(user);
      } else {
        // Add a little animation if not valid
        const errorAnim = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        errorAnim.to(".signup-form", { x: -50, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 50, duration: 0.2 });
        errorAnim.to(".signup-form", { x: -20, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 20, duration: 0.2 });
        errorAnim.to(".signup-form", { x: 0, duration: 0.2 });

        // Disable the submit button while the animation plays
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>User Signup</h3>

      <InputField
        name="name"
        type="text"
        label="Name"
        value={user.name}
        handleChange={handleChange}
        error={errors.name}
      />

      <InputField
        name="email"
        type="text"
        label="Email"
        value={user.email}
        handleChange={handleChange}
        error={errors.email}
      />

      <InputField
        name="password"
        type="password"
        label="Password"
        value={user.password}
        handleChange={handleChange}
        error={errors.password}
      />

      <InputField
        name="terms"
        type="checkbox"
        label="Terms &amp; Conditions"
        value={user.terms}
        handleChange={handleChange}
        error={errors.terms}
      />

      <button type="submit" disabled={disableSubmit}>
        Submit
      </button>
    </form>
  );
}
