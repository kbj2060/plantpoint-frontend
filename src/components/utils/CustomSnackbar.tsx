import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, {memo} from "react";

export interface AlarmProps {
  description: string;
  snackbarOpen: boolean;
  closeSnackBar: () => void;
}

const CustomSnackbar = ({description, snackbarOpen, closeSnackBar}: AlarmProps) => {
  return (
    <Snackbar open={snackbarOpen} onClose={closeSnackBar} autoHideDuration={2000}>
      <MuiAlert elevation={6} variant="filled" onClose={closeSnackBar} severity="info">
        {description}
      </MuiAlert>
    </Snackbar>
  )
}

export default memo(CustomSnackbar)

