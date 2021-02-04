import React, { useState } from "react";
import { logUserIn } from "../api/User";
import { useMutation } from "react-query";
const SignIn = ({ toggleSignUp, userDispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation(logUserIn, {
    onSuccess: (data) => {
      console.log(data);
      userDispatch({ type: "SET_TOKEN", payload: data });
    },
  });

  return (
    <div className="form">
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        onClick={() => {
          mutation.mutate({
            username,
            password,
          });
        }}
      >
        Sign In
      </button>
      <button onClick={() => toggleSignUp()}>Sign Up</button>
    </div>
  );
};

export default SignIn;
