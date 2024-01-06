import React, { useEffect } from "react";
import Logo from "../components/Logo";
import { Button, Divider } from "@mui/material";
import SocialButton from "../components/SocialButton";
import { useNavigate } from "react-router-dom";
import { MessagingActions } from "../../utils/actions/messagingActions.enum";

const Login = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    chrome.storage.local.get("profit_sea_token", (result) => {
      if (result.profit_sea_token) {
        navigate("/app");
      } else {
        chrome.runtime.sendMessage({
          action: MessagingActions.OPEN_API_KEY_VERIFICATOIN_PAGE,
        });
      }
    });
  };

  useEffect(() => {
    navigateToHome();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen min-w-[30vh] gap-10">
      <div className="flex flex-col justify-center items-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center gap-[9px]">
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
          onClick={() => {
            navigateToHome();
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
