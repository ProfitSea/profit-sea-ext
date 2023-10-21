import { Button, Divider } from "@mui/material";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { webApp } from "../api/api";
import authApi from "../api/authApi";
import CustomInput from "../sidePanel/components/CustomInput";
import Logo from "../sidePanel/components/Logo";
import "../sidePanel/index.css";

const ApiKeyVerification = () => {
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const verifyApiKey = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { tokens }: any = await authApi.verifyApiKey({ email, apiKey });

      chrome.storage.local.set({ profit_sea_token: tokens.access.token });
      chrome.storage.local.set({
        profit_sea_refresh_token: tokens.refresh.token,
      });
      setLoggedIn(true);

      chrome.runtime.sendMessage({
        type: "refresh_side_panel_after_login",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, email]);

  useLayoutEffect(() => {
    chrome.storage.local.get("profit_sea_token", (result) => {
      if (result.profit_sea_token) {
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <div className="h-[100vh] w-[100%] bg-black flex flex-col justify-center items-center gap-[20px]">
      <div className="flex flex-col justify-center items-center">
        <Logo />
      </div>
      {loggedIn ? (
        <div className="flex flex-col justify-center items-center gap-[9px]">
          <h1 className="text-white text-2xl font-semibold">
            Welcome to the ProfitSea
          </h1>
          <p className="text-white">You're logged in.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyApiKey();
          }}
          className="w-[400px] flex flex-col justify-center"
        >
          <p className="text-white">Email</p>
          <CustomInput
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter Your Email"
            type="email"
            required={true}
          />
          <p className="mt-[10px] text-white">API KEY</p>
          <CustomInput
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
            value={apiKey}
            required={true}
            placeholder="Enter API KEY"
            type="text"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            disabled={loading}
            type="submit"
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
            Verify
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
              Don't Have API Key?
            </Divider>
          </div>
          <a href={webApp} target="_blank">
            <Button
              sx={{
                width: "100%",
                height: "35px",
                backgroundColor: "#FBBB08",
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
              Generate API Key
            </Button>
          </a>
        </form>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("ap_key_verification_root")!);

root.render(<ApiKeyVerification />);
