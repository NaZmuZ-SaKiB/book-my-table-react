import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

import { GlobalState } from "../context/GlobalContext";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const LoginModal = ({ isSignin }) => {
  const { loading } = useContext(GlobalState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const { first_name, last_name, email, password, phone, city } = inputs;

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (isSignin) {
      if (password && email) {
        return setDisabled(false);
      } else {
        return setDisabled(true);
      }
    } else {
      if (first_name && last_name && email && password && city && phone) {
        setDisabled(false);
      } else {
        return setDisabled(true);
      }
    }
  }, [inputs]);

  const { signin, signup } = useAuth();

  const handleSubmit = () => {
    isSignin
      ? signin(email, password, handleClose)
      : signup(
          first_name,
          last_name,
          email,
          password,
          phone,
          city,
          handleClose
        );
  };

  return (
    <>
      {loading ? null : (
        <button
          onClick={handleOpen}
          type="button"
          className={`${
            isSignin && "sm:bg-gray-700 sm:text-white"
          } bg-white text-center text-gray-700 sm:border border-gray-700 p-1 px-4 sm:rounded sm:mr-3 sm:text-sm md:text-reg`}
        >
          {isSignin ? "Sign in" : "Sign up"}
        </button>
      )}
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
          {loading ? (
            <div className="flex justify-center px-2 py-24">
              <CircularProgress />
            </div>
          ) : (
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
                <AuthModalInputs
                  isSignin={isSignin}
                  handleChange={handleInputChange}
                />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={disabled}
                  className="uppercase bg-gray-700 w-full text-white p-3 rounded text-sm mb-2 disabled:bg-gray-200"
                >
                  {isSignin ? "Sign In" : "Create Account"}
                </button>
                <button
                  onClick={handleClose}
                  className="uppercase bg-gray-300 w-full text-gray-700 p-3 rounded text-sm mb-5"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
