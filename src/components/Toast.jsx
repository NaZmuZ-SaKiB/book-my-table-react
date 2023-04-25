import React, { useContext, useEffect, useState } from "react";

import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GlobalState } from "../context/GlobalContext";
import { AlertTitle } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = () => {
  const { data, loading, success, error, setGlobalState } =
    useContext(GlobalState);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  useEffect(() => {
    if (success) {
      setSeverity("success");
    } else if (error) {
      setSeverity("error");
    } else {
      setSeverity("info");
    }
    if (success || error) {
      setOpen(true);
    }
  }, [success, error]);

  const handleClose = () => {
    setOpen(false);
    setGlobalState({ data, loading, success: null, error: null });
  };

  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }

  if (!success && !error) return null;
  else
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {success && success}
          {error && (
            <>
              <AlertTitle>{error?.error}</AlertTitle>
              {error?.message}
            </>
          )}
        </Alert>
      </Snackbar>
    );
};

export default Toast;
