import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";
import { useAppDispatch } from "@/store";
import { authCheckAsync } from "@/store/async/authAsync";
import { useEffect } from "react";

const App = () => {
  const dispatch = useAppDispatch();

  const checkingAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(authCheckAsync(token));
    }
  };

  useEffect(() => {
    checkingAuth();
  }, []);

  return <RouterProvider router={createBrowserRouter(router)} />;
};

export default App;
