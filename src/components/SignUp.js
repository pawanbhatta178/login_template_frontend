import React, { useState } from "react";
import { useMutation } from "react-query";
import { signUserUp } from "../api/User";

const SignUp = ({ toggleSignIn, userDispatch }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
    country: "",
  });
  const mutation = useMutation(signUserUp, {
    onSuccess: (data) => {
      console.log(data);
      userDispatch({ type: "SET_TOKEN", payload: data });
    },
  });

  return (
    <div className="form">
      <input
        placeholder="username "
        value={userData?.username}
        onChange={(e) =>
          setUserData((current) => {
            return { ...current, username: e.target.value };
          })
        }
      ></input>
      <input
        placeholder="email"
        value={userData?.email}
        onChange={(e) =>
          setUserData((current) => {
            return { ...current, email: e.target.value };
          })
        }
      ></input>
      <input
        placeholder="password"
        value={userData?.password}
        onChange={(e) =>
          setUserData((current) => {
            return { ...current, password: e.target.value };
          })
        }
      ></input>
      <input
        placeholder="re-password"
        value={userData?.rePassword}
        onChange={(e) =>
          setUserData((current) => {
            return { ...current, rePassword: e.target.value };
          })
        }
      ></input>
      <input
        placeholder="country"
        value={userData?.country}
        onChange={(e) =>
          setUserData((current) => {
            return { ...current, country: e.target.value };
          })
        }
      ></input>
      <button
        onClick={() => {
          mutation.mutate(userData);
        }}
      >
        Sign Up
      </button>
      <button onClick={() => toggleSignIn()}>Sign In</button>
    </div>
  );
};

export default SignUp;
