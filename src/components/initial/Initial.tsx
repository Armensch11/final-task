import { Button, Typography } from "@mui/material";
import "./Initial.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "src/hooks/typedReduxHooks/typedReduxHooks";
import { logIn } from "src/reducers/authSlice";

const Initial = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const userData = JSON.parse(user);
      dispatch(logIn({ ...userData, isLogged: true }));
      navigate("/search", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="home-content">
        <Typography variant="h4" mb={1}>
          Q-1 search
        </Typography>
        <Typography variant="subtitle2" mb={3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          odio soluta possimus eaque!
        </Typography>
        <Button
          variant="outlined"
          size={"large"}
          fullWidth={false}
          sx={{ backgroundColor: "#FFFFFF" }}
          component={Link}
          to={"/auth/login"}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Initial;
