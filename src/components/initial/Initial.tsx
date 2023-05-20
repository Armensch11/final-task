import { Button, Typography } from "@mui/material";
import "./Initial.css";
import { Link } from "react-router-dom";
const Home = () => {
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
          to={"/login"}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Home;
