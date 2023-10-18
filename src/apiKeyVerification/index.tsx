import React from "react";
import CustomInput from "../sidePanel/components/CustomInput";
import { createRoot } from "react-dom/client";
import "../sidePanel/index.css";
import { Button } from "@mui/material";
import Logo from "../sidePanel/components/Logo";

const ApiKeyVerification = () => {
  const [apiKey, setApiKey] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <div className="h-[100vh] w-[100%] bg-black flex flex-col justify-center items-center gap-[20px]">
      <div className="flex flex-col justify-center items-center">
        <Logo />
      </div>
      <div className="w-[400px] flex flex-col justify-center">
        <p className="text-white">Email</p>
        <CustomInput
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Enter Your Email"
          type="email"
        />
        <p className="mt-[10px] text-white">API KEY</p>
        <CustomInput
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          value={apiKey}
          placeholder="Enter API KEY"
          type="text"
        />
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
            console.log("clicked");
            chrome.storage.local.set({ profit_sea_api_key: apiKey });
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("ap_key_verification_root")!);

root.render(<ApiKeyVerification />);
