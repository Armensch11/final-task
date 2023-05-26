import { Typography, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Page404.css";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";

const StyledButton = styled(Button)({
  fontSize: "14px",
  textDecoration: "none",
  textTransform: "none",
  backgroundColor: "#D8E7FF",
  borderRadius: "24px",
  color: "#000000",
});

const Page404 = () => {
  const navigate = useNavigate();
  const isUser = useAppSelector((state) => state.authState.isLogged);

  const redirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isUser ? navigate("/search") : navigate("/auth/login");
  };
  return (
    <>
      <div className="notFound-container">
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {"404"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#9F9F9F" }}>
          {"Page not found"}
        </Typography>
        <StyledButton variant="contained" onClick={redirect}>
          {"Back to Search"}
        </StyledButton>
      </div>
    </>
  )
}

export default Page404;
