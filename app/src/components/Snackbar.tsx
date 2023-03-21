import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Severity = "error" | "warning" | "info" | "success";

const severityColors = {
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
  success: "#4caf50",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { severity } = props;
  const backgroundColor = severityColors[severity as Severity];
  return (
    <MuiAlert
      ref={ref}
      variant="filled"
      role="alert"
      {...props}
      style={{ backgroundColor}}
    />
  );
});

interface SnackbarProps {
  severity: Severity;
  message: string;
}

export const CustomizedSnackbar = (props: SnackbarProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    ev?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      onClose={handleClose}
      style={{bottom: "30px"}}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};
