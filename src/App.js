import "./App.css";
import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import { getAccessToken, logUserOut, getUserDetails } from "./api/User";
import { QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "LOGOUT":
      return null;

    default:
      return state;
  }
};

function App() {
  const [signIn, setSignIn] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const [userState, userDispatch] = React.useReducer(userReducer);
  const [data, setData] = React.useState();

  React.useEffect(() => {
    (async () => {
      const data = await getAccessToken();
      if (data) {
        userDispatch({ type: "SET_TOKEN", payload: data });
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!userState?.token) {
      return;
    }
    console.log({ token: userState.token });
    axios.defaults.headers.common[
      "Authorization"
    ] = `bearer ${userState.token}`;
  }, [userState?.token]);

  const toggleSignIn = () => {
    setSignIn(!signIn);
    setSignUp(!signUp);
  };

  const toggleSignUp = () => {
    setSignUp(!signUp);
    setSignIn(!signIn);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {userState?.token && (
          <User accessToken={userState.token} userDispatch={userDispatch} />
        )}
        {signIn && (
          <SignIn userDispatch={userDispatch} toggleSignUp={toggleSignUp} />
        )}
        {signUp && (
          <SignUp userDispatch={userDispatch} toggleSignIn={toggleSignIn} />
        )}
        {userState && (
          <button
            onClick={async () => {
              const data = await logUserOut();
              if (data) {
                userDispatch({ type: "LOGOUT" });
              }
            }}
          >
            Logout
          </button>
        )}
        {userState && (
          <>
            <button
              onClick={async () => {
                const data = await getUserDetails();
                setData(data);
              }}
            >
              Click to see protected data
            </button>
            <div>{data?.username}</div>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
