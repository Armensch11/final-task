import { useEffect } from "react";
import { useAppDispatch } from "../typedReduxHooks/typedReduxHooks";
import { logIn } from "../../reducers/authSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);

      dispatch(logIn({ isLogged: true, ...parsedUserData }));
    }
  }, []);

  return;
};

export default useAuth;
