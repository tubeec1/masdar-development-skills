import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "./route/AppRoutes";
import axios from "./services/api"; // Uses your pre-configured centralized service base
import { setCredentials, logoutUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const syncAndVerifySession = async () => {
      try {
        // Automatically uses your instance URL and attaches the token via your headers structure
        const response = await axios.get("/auth/profile");

        if (response.data && response.data.user) {
          dispatch(
            setCredentials({
              user: response.data.user,
              token: token,
            }),
          );
        } else {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error("Session re-authentication failed:", error);
        dispatch(logoutUser());
      }
    };

    syncAndVerifySession();
  }, [dispatch]);

  return <RouterProvider router={routes} />;
}

export default App;
