import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginUserForm = () => {
  const { isSubmitting, login } = useLogin();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", loginValues.email);
    formData.append("password", loginValues.password);
    await login(formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login-email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={loginValues.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="login-password"
          autoComplete="current-password"
          value={loginValues.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, opacity: isSubmitting ? 0.8 : 1 }}
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Box>
      <Typography sx={{ mt: "8px" }} align="center">
        Don&apos;t have an account{" "}
        <Link to={"/register"} className="underline">
          Sign Up Here
        </Link>{" "}
      </Typography>
    </Container>
  );
};

export default LoginUserForm;
