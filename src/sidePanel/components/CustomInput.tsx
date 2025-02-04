import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

interface CustomInputProps {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  sx?: any;
  required?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  onChange,
  value,
  type,
  required = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (type === "password")
    return (
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        sx={{
          width: "100%",
          height: "35px",
          backgroundColor: "#FFFFFF",
          padding: "21px 14px 21px 14px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="standard-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
    );

  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      sx={{
        width: "100%",
        height: "35px",
        backgroundColor: "#FFFFFF",
        padding: "21px 14px 21px 14px",
        borderRadius: "5px",
        fontSize: "14px",
      }}
      type={type}
      required={required}
    />
  );
};

export default React.memo(CustomInput);
