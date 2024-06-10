import { Box, Modal } from "@mui/material";
import { useState } from "react";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const AuthModal = ({ isSignin }: { isSignin: boolean }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        type="button"
        className={`${
          isSignin && "sm:bg-gray-700 sm:text-white"
        } bg-white text-center text-gray-700 sm:border border-gray-700 p-1 px-4 sm:rounded sm:mr-3 sm:text-sm md:text-reg`}
      >
        {isSignin ? "Sign in" : "Sign up"}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="p-2 md:p-6 w-full h-full sm:h-auto sm:w-[400px]"
        >
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">
                {isSignin ? "Sign In" : "Create Account"}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {isSignin
                  ? "Log Into Your Account"
                  : "Create Your BookMyTable Account"}
              </h2>

              {isSignin ? (
                <SignInForm handleClose={handleClose} />
              ) : (
                <SignUpForm handleClose={handleClose} />
              )}
              <button
                onClick={handleClose}
                className="uppercase bg-gray-300 w-full text-gray-700 p-3 rounded text-sm mb-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AuthModal;
