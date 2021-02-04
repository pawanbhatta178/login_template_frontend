import React from "react";
import { useQuery, useMutation } from "react-query";
import { getUserDetails, getAccessToken } from "../api/User";

const User = ({ accessToken, userDispatch }) => {
  const { data, error } = useQuery("userData", getUserDetails);
  const mutation = useMutation(getAccessToken, {
    onSuccess: (data) => {
      console.log(data);
      userDispatch({ type: "SET_TOKEN", payload: data });
    },
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      mutation.mutate({});
    }, 10000);
    return () => {
      console.log("unmounting");
      clearInterval(timer);
    };
  }, []);

  return <pre>{console.log(accessToken)}</pre>;
};

export default User;
