import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";

// Import Dependencies
import axios from "axios";

function App() {
  // Set a state in case we get server error
  const [serverError, setServerError] = useState(null);

  // Set a state for the post data
  const [post, setPost] = useState([]);

  // Handle form submission
  const formSubmission = (userData) => {
    axios
      .post("https://reqres.in/api/users", userData)
      .then((resp) => {
        // update temp state with value from API to display in <pre>
        setPost(resp.data);

        // if successful request, clear any server errors
        setServerError(null);
      })
      .catch((err) => {
        // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
        // set serverError
        setServerError("oops! something happened!");
      });
  };

  return (
    <div className="App">
      <Form formSubmission={formSubmission} />

      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}

export default App;
