import React from "react";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";
import { Button, Divider } from "@mui/material";
import SocialButton from "../components/SocialButton";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen min-w-[30vh] gap-10">
      <div className="flex flex-col justify-center items-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center gap-[9px]">
        <CustomInput
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <CustomInput
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <div className="text-gray-500 text-xs w-[100%] font-semibold text-right">
          <p>
            Misplaced yer map? <u className="cursor-pointer">Reset Password</u>
          </p>
        </div>
        <Button
          sx={{
            width: "100%",
            height: "35px",
            backgroundColor: "#FBBB00",
            padding: "21px 14px 21px 14px",
            borderRadius: "5px",
            fontSize: "15px",
            color: "white",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "#FBBB00",
            },
          }}
        >
          LOGIN
        </Button>
        <div className="w-[100%] mt-[20px]">
          <Divider
            sx={{
              color: "#FBBB00",
              "&::before, &::after": {
                borderColor: "#E8ECF4",
              },
            }}
            orientation="horizontal"
            flexItem
            variant="fullWidth"
          >
            Or Login with
          </Divider>
        </div>
        <div className="w-[100%] flex flex-row justify-center items-center gap-2">
          <SocialButton icon="facebook" onClick={() => {}} />
          <SocialButton icon="google" onClick={() => {}} />
          <SocialButton icon="apple" onClick={() => {}} />
        </div>
        <p className="text-white font-[400]">
          Set Course for Profits!{" "}
          <u className="cursor-pointer">Enlist & Conquer</u>
        </p>
      </div>
    </div>
  );
};

export default Login;
